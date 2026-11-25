import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import prisma from "../config/prisma.client"
import bcrypt from "bcryptjs"
import { generateAccessToken, generatePwdResetToken, generateRefreshToken, verifyAccessToken, verifyPwdResetToken, verifyRefreshToken } from "../config/jwt"
import path from "path"
import fs from 'fs'
import sendEmail from "../config/mailer.config"
import { newPasswordSchema, oldPasswordSchema } from "../validations/user.schema"


const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    let data = req.body

    if (req.file && req.file.filename) {
        data = {
            ...data,
            image: req.file.filename
        }
    }

    console.log("Here:::", data)

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
    const { password: _pw, ...resultUser } = user;

    res.status(200).json({
        message: "Login successful",
        result: {
            ...resultUser,
            accessToken,
            refreshToken,
        },
        meta: null,
    });
})

const profileCtrl = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.userInfo
    if(user) {
        const {password, ...result } = user
        res.status(200).json({
            result: result,
            message: "User profile"
        })
    }else{
        throw {
            message: 'Login to continue',
            status: 401
        }
    }
})


const refreshTokenCtrl = catchAsync(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const authorization = req.headers.authorization;

        if (
            !authorization ||
            !authorization.startsWith("Bearer ")
        ) {
            throw {
                message: "Refresh token is required",
                status: 401,
            };
        }

        const refreshToken = authorization.slice(7);

        let decoded: { userId: string };

        try {
            decoded = verifyRefreshToken(refreshToken) as {
                userId: string;
            };
        } catch {
            throw {
                message: "Invalid or expired refresh token",
                status: 401,
            };
        }

        if (!decoded.userId) {
            throw {
                message: "Invalid refresh token payload",
                status: 401,
            };
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });

        if (!user) {
            throw {
                message: "Invalid refresh session",
                status: 401,
            };
        }

        const accessToken = generateAccessToken(user.id);

        return res.status(200).json({
            result: {
                accessToken,
            },
            message: "Successfully created new access token",
            meta: null,
        });
    }
);


const updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {oldPassword, newPassword, confirmPassword} = req.body

    const currentUser = req.userInfo

    // step 1: validate oldPassword is present
    const { error: oldPasswordError } = oldPasswordSchema.validate({ oldPassword })
    if (oldPasswordError) {
        throw {
            message: oldPasswordError.details[0].message,
            status: 400
        }
    }
    
    // step 2: check it actually matches
    const isMatch = bcrypt.compareSync(oldPassword, currentUser?.password as string)
    if (!isMatch) {
        throw {
            message: "Old password does not match",
            status: 400
        }
    }

    // step 3: only now validate new password rules
    const { error: newPasswordError } = newPasswordSchema.validate({ newPassword, confirmPassword })
    if (newPasswordError) {
        throw {
            message: newPasswordError.details[0].message,
            status: 400
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


const forgetPassword = catchAsync(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { email } = req.body;

        const normalizedEmail = email.trim();

        const user = await prisma.user.findUnique({
            where: {
                email: normalizedEmail,
            },
        });

        // Don't reveal whether an email is registered.
        if (!user) {
            return res.status(200).json({
                result: null,
                meta: null,
                message:
                    "If an account exists for this email, a password reset link has been sent.",
            });
        }

        const toTitleCase = (name: string): string => {
            return name
                .split(" ")
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                )
                .join(" ");
        };

        const pwdResetHTMLPath = path.join(
            __dirname,
            "..",
            "mails",
            "pwd-reset.template.html"
        );

        const pwdResetHTML = fs.readFileSync(
            pwdResetHTMLPath,
            "utf-8"
        );

        // 15-minute reset token
        const pwdResetToken = generatePwdResetToken(
            user.id,
            "15m"
        );

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "http://localhost:3000";

        const resetLink =
            `${frontendUrl}/reset-password?t=${encodeURIComponent(pwdResetToken)}`;

        const mailData = {
            name:
                toTitleCase(user.first_name) +
                " " +
                toTitleCase(user.last_name),
            expires_in: "15 minutes",
            resetLink,
        };

        const replacedHTML = pwdResetHTML.replace(
            /{{(.*?)}}/g,
            (_, key) => {
                return (
                    mailData[
                        key.trim() as keyof typeof mailData
                    ] || ""
                );
            }
        );

        const sentMail = await sendEmail({
            to: user.email,
            subject: "T2M Reset Password",
            html: replacedHTML,
        });

        if (sentMail !== "OK") {
            throw {
                message:
                    "Failed to send email. Please try again later.",
                status: 500,
            };
        }

        return res.status(200).json({
            result: null,
            meta: null,
            message:
                "If an account exists for this email, a password reset link has been sent.",
        });
    }
);


const resetPassword = catchAsync(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { token } = req.params;
        const { password } = req.body;

        let decoded: { userId: string };

        try {
            decoded = verifyPwdResetToken(token as string) as {
                userId: string;
            };

            if (!decoded?.userId) {
                throw new Error("Invalid token payload");
            }
        } catch {
            throw {
                message:
                    "Password reset link is invalid or expired. Please request a new one.",
                status: 400,
            };
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });

        if (!user) {
            throw {
                message: "Invalid password reset link.",
                status: 400,
            };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });

        return res.status(200).json({
            result: null,
            meta: null,
            message:
                "Password reset successfully. Please sign in with your new password.",
        });
    }
);





export {
    registerUser,
    loginUser,
    refreshTokenCtrl,
    updatePassword,
    updateUserInfo,
    forgetPassword,
    resetPassword,
    profileCtrl
}