import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import prisma from "../config/prisma.client";
import path from "path";
import { promises as fs } from 'fs';

const addCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {name, icon} = req.body 
    const currentUser = req.userInfo

    const isExisting = await prisma.category.findUnique({
        where: {
            name_userId: {
                name: name.toLowerCase().trim(),
                userId: currentUser?.id! 
            }
        }
    })

    if(isExisting){
        throw {
            message: `You already have category with name "${name.trim()}"`,
            status: 409
        }
    }

    const iconPath = path.join(__dirname, '..', '..', 'uploads', 'catIcons', icon.trim())

    try {
        await fs.access(iconPath, fs.constants.F_OK)
    } catch (error) {
        throw {
            message: "Category image does not exist on server",
            status: 400
        }
    }

    const category = await prisma.category.create({
        data: {
            icon: icon.trim(),
            name: name.toLowerCase().trim(),
            userId: currentUser?.id!
        }
    })

    res.status(200).json({
        message: 'Category created sucessfully',
        result: category,
        meta: null
    })
})

const getAllCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.userInfo

    const categories = await prisma.category.findMany({
        where: {
            userId: currentUser?.id!
        }, 
        include: {
            transactions: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.status(200).json({
        result: categories,
        message: 'All categories fetched',
        meta: null
    })
})

const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.userInfo

    const {id} = req.params

    const category = await prisma.category.findUnique({
        where: {
            id
        }
    })

    if(!category){
        throw {
            message: 'Category with provided id doesnot exist',
            status: 400
        }
    }

    if(category?.userId !== currentUser?.id){
        throw {
            message: "You can only delete categories that you have created",
            status: 400
        }
    }

    await prisma.category.delete({
        where: {
            id
        }
    })

    res.status(200).json({
        result: null, 
        message: 'Category deleted successfully',
        meta: null
    })
})

const editCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.userInfo
    const {id} = req.params
    const {name, icon} = req.body

    const category = await prisma.category.findUnique({
        where: {
            id
        }
    })

    if(!category){
        throw {
            message: 'Category with provided id doesnot exist',
            status: 400
        }
    }

    if(category?.userId !== currentUser?.id){
        throw {
            message: "You can only edit categories that you have created",
            status: 400
        }
    } 

    const iconPath = path.join(__dirname, '..', '..', 'uploads', 'catIcons', icon.trim())

    try {
        await fs.access(iconPath, fs.constants.F_OK)
    } catch (error) {
        throw {
            message: "Category image does not exist on server",
            status: 400
        }
    }

    const updatedCategory = await prisma.category.update({
        where: {
            id
        }, data: {
            icon: icon.trim(),
            name: name.toLowerCase().trim(),
        }
    })

    res.status(200).json({
        message: 'Category updated successfully',
        result: updatedCategory,
        meta: null
    })
})

const getCategoryById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const currentUser = req.userInfo

    const category = await prisma.category.findUnique({
        where: {
            id_userId: {
                id,
                userId: currentUser?.id!
            }
        }, include: {
            transactions: true
        }
    })

    if(!category) {
        throw {
            message: `Category with id ${id} doesnot exist`,
            status: 400
        }
    }

    res.status(200).json({
        message: 'Category details',
        result: category,
        meta: null
    })
})


export {
    addCategory,
    getAllCategory,
    deleteCategory,
    editCategory,
    getCategoryById
}