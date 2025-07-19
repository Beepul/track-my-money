import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import prisma from "../config/prisma.client"
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../config/jwt"
import path from "path"
import fs from 'fs'


const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    let data = req.body

    if (req.file && req.file.filename) {
        data = {
            ...data,
            image: req.file.filename
        }
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    })

    if (existingUser) {
        throw { message: 'User with this email already exist', status: 409 }
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt)

    const result = await prisma.user.create({
        data: {
            email: data.email.trim(),
            first_name: data.first_name.trim(),
            last_name: data.last_name.trim(),
            password: hashedPassword,
            image: data.image ? data.image : null
        },
        omit: {
            password: true
        }
    })

    res.status(200).json({
        result,
        message: "User created successfully",
        meta: null
    })
})

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user || !user.password) {
        throw {
            message: "Invalid credentials",
            status: 401
        }
    }

    const isMatch = bcrypt.compareSync(password, user?.password)

    if (!isMatch) {
        throw {
            message: "Invalid credentials",
            status: 401
        }
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = generateRefreshToken(user.id)

    res.cookie('T2M_JWT', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
        sameSite: 'strict',
        path: '/api/v1/user/', // limit exposure
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const { password: _pw, ...resultUser } = user;

    res.status(200).json({
        message: 'Login successful',
        result: {
            ...resultUser,
            accessToken
        },
        meta: null
    })



})


const refreshTokenCtrl = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.T2M_JWT;

    if (!refreshToken) {
        throw {
            message: 'Refresh token not found in cookie',
            status: 401
        }
    }

    try {
        const decoded = verifyRefreshToken(refreshToken) as { userId: string }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })

        if(!user){
            throw {
                message: 'User not found',
                status: 404
            }
        }

        const accessToken = generateAccessToken(user.id);

        res.status(200).json({
            result: {
                accessToken,
            },
            message: 'Successfully created new access token',
            meta: null
        })
        
    } catch (error) {
        throw {
            message: 'Invalid or expired refresh token',
            status: 401
        }
    }
})

const logOutUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies
    
    if(!cookies || !cookies?.T2M_JWT){
        throw {
            message: 'No cookie found',
            status: 204
        }
    }

    res.clearCookie('T2M_JWT')

    res.status(200).json({
        result: null,
        message: 'User logged out successfully',
        meta: null 
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {oldPassword, newPassword} = req.body

    const currentUser = req.userInfo
    
    const isMatch = bcrypt.compareSync(currentUser?.password as string, oldPassword)

    if (!isMatch) {
        throw {
            message: "Old password doesnot match",
            status: 401
        }
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt)

    await prisma.user.update({
        where: {
            id: currentUser?.id
        }, data: {
            password: hashedPassword,
        }, omit: {
            password: true
        }
    })

    res.status(200).json({
        result: null,
        meta: null, 
        message: 'Password updated successfully'
    })
})

const updateUserInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {first_name, last_name} = req.body

    let data: {first_name: string, last_name: string, image?: string} = {
        first_name: first_name.trim(),
        last_name: last_name.trim()
    }

    const currentUser = req.userInfo

    if (req.file && req.file.filename) {
        data = {
            ...data,
            image: req.file.filename
        }
        if(currentUser?.image) {
            const oldImagePath = path.join(__dirname, '..', '..', 'uploads', 'profile', currentUser.image)

            fs.access(oldImagePath, fs.constants.F_OK, (err) => {
                if(!err) {
                    fs.unlink(oldImagePath, (e)=> {
                        if(e) {
                            console.log('Unable to delete image', e)
                        } else {
                            console.log('Image deleted successfully')
                        }
                    })
                }else {
                    console.log('Old image not found')
                }
            })
        }
    }


    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser?.id 
        },
        data: {
            ...data
        },
        omit: {
            password: true
        }
    })

    res.status(200).json({
        result: updatedUser,
        meta: null,
        message: 'User updated successfully'
    })

})




export {
    registerUser,
    loginUser,
    logOutUser,
    refreshTokenCtrl,
    resetPassword,
    updateUserInfo
}