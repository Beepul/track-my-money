import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import path from "path";
import fs from 'fs';

export const validateBody = (schema: Joi.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const data = req.body

        if (!data) {
            throw { message: "No data present inside body", status: 400 }
        }

        await schema.validateAsync(data, { abortEarly: false })

        next()
    } catch (error: any) {

        if (req.file && req.file.filename) {
            const imgPath = path.join(__dirname, '..', '..', 'uploads', 'profile', req.file.filename)

            fs.access(imgPath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(imgPath, (e) => {
                        if (e) {
                            console.log('Unable to delete image', e)
                        } else {
                            console.log('Pre-uploaded image deleted successfully')
                        }
                    })
                } else {
                    console.log('Pre-uploaded image not found')
                }
            })
        }

        let errorMsg: string[] = []

        if (error instanceof Joi.ValidationError) {
            error.details.map((err) => {
                if (!err.path.includes('password')) {
                    errorMsg.push(err.message)
                } else {
                    if (err.type !== 'string.pattern.base') {
                        errorMsg.push(err.message)
                    } else {
                        errorMsg.push('"password" is required and must contain A-Z, a-z, 0-9, and one symbol like: @#$%...')
                    }
                }
            })
            throw { message: errorMsg.join(" / "), status: 400 }
        }

        throw { message: error.message, status: error.status }
    }

};