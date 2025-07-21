import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import prisma from "../config/prisma.client"
import bcrypt from "bcryptjs"
import { generateAccessToken, generatePwdResetToken, generateRefreshToken, verifyAccessToken, verifyPwdResetToken, verifyRefreshToken } from "../config/jwt"
import path from "path"
import fs from 'fs'
import sendEmail from "../config/mailer.config"


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

const updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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


const forgetPassword = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body 

    const user = await prisma.user.findUnique({
        where: {
            email: email.trim()
        }
    })

    if(!user) {
        throw {
            message: `User with email: ${email} doesnot exist`,
            status: 400
        }
    }

    const toTitleCase = (name: string): string => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const pwdResetHTMLPath = path.join(__dirname, '..', 'mails', 'pwd-reset.template.html')
    
    const pwdResetHTML = fs.readFileSync(pwdResetHTMLPath, 'utf-8')

    const pwdResetToken = generatePwdResetToken(user.id, '1m')

    const mailData = {
        name: toTitleCase(user.first_name) + ' ' + toTitleCase(user.last_name),
        expires_in: '1 minute',
        resetLink: `http://localhost:3000/auth/reset-password?t=${pwdResetToken}`
    };

    console.log(mailData)
    
    const replacedHTML = pwdResetHTML.replace(/{{(.*?)}}/g, (_, key) => {
        return mailData[key.trim() as keyof typeof mailData] || ''
    })

    const sentMail = await sendEmail({
        to: user.email,
        subject: 'T2M Reset Password',
        html: replacedHTML
    })

    if(sentMail !== 'OK'){
        throw {
            message: 'Failed to send mail, Please try again later',
            status: 400
        }
    }

    res.status(200).json({
        result: null,
        meta: null,
        message: 'Password reset link has been sent to your mail'
    })
    
})


const resetPassword = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.params
    const {password} = req.body

    const decoded = verifyPwdResetToken(token as string) as {userId: string}

    if(!decoded) {
        throw {
            message: 'Token invalid, Please use another token',
            status: 400
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.userId 
        }
    })

    if(!user) {
        throw {
            message: 'User not found',
            status: 400
        }
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)

    await prisma.user.update({
        where: {
            id: decoded.userId
        },
        data: {
            password: hashedPassword
        }
    })

    res.status(200).json({
        result: null,
        meta: null,
        message: 'Your password has been reset, Please login to continue further'
    })
})




export {
    registerUser,
    loginUser,
    logOutUser,
    refreshTokenCtrl,
    updatePassword,
    updateUserInfo,
    forgetPassword,
    resetPassword
}