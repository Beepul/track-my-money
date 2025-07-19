import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import prisma from "../config/prisma.client";
import { verifyAccessToken } from "../config/jwt";


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let token = req.headers['authorization'] || null 
        
        token = token?.split(" ").pop() || null 

        if(!token){
            return res.status(401).json({
                meta: null,
                result: null,
                message: 'Please login to continue'
            })
        }

        const tokenData = verifyAccessToken(token) as {userId: string}

        const userDetails = await prisma.user.findUnique({
            where: {
                id: tokenData.userId,
            },
        })

        if(!userDetails){
            return res.status(401).json({
                meta: null,
                result: null,
                message: 'You are not eligible to access this resources, Please register and login first'
            })
        }

        req.userInfo = userDetails

        next()


    } catch (error) {
        return res.status(401).json({
            meta: null,
            result: null,
            message: 'You are not authoried to access this resources'
        })
    }
}

