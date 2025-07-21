import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '15m',
    });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: '7d',
    });
};

export const generatePwdResetToken = (userId: string, expiresIn: jwt.SignOptions["expiresIn"]) => {
    return jwt.sign({userId}, process.env.JWT_PWD_RESET_SECRET!, {
        expiresIn
    })
}

export const verifyAccessToken = (token: string) =>
    jwt.verify(token, process.env.JWT_SECRET!);

export const verifyRefreshToken = (token: string) =>
    jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

export const verifyPwdResetToken = (token: string) =>
    jwt.verify(token, process.env.JWT_PWD_RESET_SECRET!);

