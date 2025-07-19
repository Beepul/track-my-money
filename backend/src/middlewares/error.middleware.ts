import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.log("Error Console:: ",err)
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        result: err.data || null,
        message: message,
        meta: null,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    })
};
