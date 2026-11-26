import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import prisma from "../config/prisma.client"
import bcrypt from "bcryptjs"
import { generateAccessToken, generatePwdResetToken, generateRefreshToken, verifyAccessToken, verifyPwdResetToken, verifyRefreshToken } from "../config/jwt"
import path from "path"
import fs from 'fs'
import sendEmail from "../config/mailer.config"
import { newPasswordSchema, oldPasswordSchema } from "../validations/user.schema"
import { OAuth2Client } from "google-auth-library";

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


const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

const googleAuth = catchAsync(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { credential } = req.body;

        if (
            typeof credential !== "string" ||
            !credential
        ) {
            throw {
                message: "Google credential is required",
                status: 400,
            };
        }

        // Verify the Google ID token on the backend
        let payload;

        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID!,
            });

            payload = ticket.getPayload();
        } catch {
            throw {
                message: "Invalid Google credential",
                status: 401,
            };
        }

        if (
            !payload?.sub ||
            !payload.email ||
            !payload.email_verified
        ) {
            throw {
                message: "Google account verification failed",
                status: 401,
            };
        }

        const googleId = payload.sub;
        const email = payload.email;
        const firstName = payload.given_name || "Google";
        const lastName = payload.family_name || "";

        // Check existing Google account
        let user = await prisma.user.findUnique({
            where: { googleId },
        });

        if (!user) {
            // Check whether email is already registered
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                // Don't automatically link an existing
                // password-based account using only email.
                throw {
                    message:
                        "This email is already registered. Sign in using your existing method to link Google.",
                    status: 409,
                };
            }

            // Create a new Google account
            user = await prisma.user.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    googleId,
                    password: null,
                    image: payload.picture || null,
                },
            });
        }

        // Reuse your existing JWT functions
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        const { password: _password, ...resultUser } = user;

        return res.status(200).json({
            success: true,
            message: "Google authentication successful",
            result: {
                ...resultUser,
                accessToken,
                refreshToken,
            },
            meta: null,
        });
    }
);


const linkGoogleAccount = catchAsync(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userId = req.userInfo?.id;
        const { credential } = req.body;

        if (!userId) {
            throw {
                message: "Unauthorized",
                status: 401,
            };
        }

        if (
            typeof credential !== "string" ||
            !credential
        ) {
            throw {
                message: "Google credential is required",
                status: 400,
            };
        }

        let payload;

        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID!,
            });

            payload = ticket.getPayload();
        } catch {
            throw {
                message: "Invalid Google credential",
                status: 401,
            };
        }

        if (
            !payload?.sub ||
            !payload.email ||
            !payload.email_verified
        ) {
            throw {
                message: "Google account verification failed",
                status: 401,
            };
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw {
                message: "User not found",
                status: 404,
            };
        }

        if (
            user.email.toLowerCase() !==
            payload.email.toLowerCase()
        ) {
            throw {
                message:
                    "Google account email must match your registered email.",
                status: 400,
            };
        }

        const linkedAccount = await prisma.user.findUnique({
            where: {
                googleId: payload.sub,
            },
        });

        if (linkedAccount && linkedAccount.id !== user.id) {
            throw {
                message:
                    "This Google account is already linked to another user.",
                status: 409,
            };
        }

        if (user.googleId && user.googleId !== payload.sub) {
            throw {
                message:
                    "Your account is already linked to a different Google account.",
                status: 409,
            };
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                googleId: payload.sub,
            },
        });

        return res.status(200).json({
            message: "Google account linked successfully.",
            result: null,
            meta: null,
        });
    }
);



const uploadProfileImage = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userInfo?.id;

        // Delete the newly uploaded file if an error occurs
        const deleteUploadedFile = async () => {
            if (req.file) {
                await fs.promises.unlink(req.file.path).catch(() => {});
            }
        };

        if (!userId) {
            await deleteUploadedFile();

            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select a profile image.",
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            await deleteUploadedFile();

            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const backendUrl = process.env.BACKEND_PUBLIC_URL;

        if (!backendUrl) {
            await deleteUploadedFile();

            return res.status(500).json({
                success: false,
                message: "Backend public URL is not configured.",
            });
        }

        // Generate the image URL using your existing uploads/profile folder
        const imageUrl = `${backendUrl.replace(/\/$/, "")}/api/v1/uploads/profile/${req.file.filename}`;

        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    image: imageUrl,
                },
            });

            // Remove previous locally uploaded profile image
            if (user.image) {
                try {
                    const previousUrl = new URL(user.image);
                    const baseUrl = new URL(backendUrl);

                    const profilePrefix = "/api/v1/uploads/profile/";

                    if (
                        previousUrl.origin === baseUrl.origin &&
                        previousUrl.pathname.startsWith(profilePrefix)
                    ) {
                        const filename = previousUrl.pathname.slice(
                            profilePrefix.length
                        );

                        // Only allow a single filename, not nested paths
                        if (
                            filename &&
                            filename === path.basename(filename)
                        ) {
                            const previousImagePath = path.resolve(
                                process.cwd(),
                                "uploads",
                                "profile",
                                filename
                            );

                            // Never delete the newly uploaded file
                            if (
                                previousImagePath !== path.resolve(req.file.path)
                            ) {
                                await fs.promises
                                    .unlink(previousImagePath)
                                    .catch(() => {});
                            }
                        }
                    }
                } catch {
                    // Ignore invalid or external image URLs
                }
            }

            return res.status(200).json({
                success: true,
                message: "Profile image uploaded successfully.",
                image: imageUrl,
            });
        } catch (error) {
            await deleteUploadedFile();
            throw error;
        }
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
    profileCtrl,
    googleAuth,
    linkGoogleAccount,
    uploadProfileImage,
}