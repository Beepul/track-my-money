import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import prisma from "../config/prisma.client";

const addTransaction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, amount, note, type, categoryId, date } = req.body

    const currentUser = req.userInfo

    const category = await prisma.category.findUnique({
        where: {
            id_userId: {
                id: categoryId,
                userId: currentUser?.id!
            }
        }
    })

    if (!category) {
        throw {
            message: 'Please provide valid category id',
            status: 400
        }
    }

    const transaction = await prisma.transaction.create({
        data: {
            amount,
            title: title.trim(),
            type,
            categoryId,
            note: note ? note.trim() : null,
            userId: currentUser?.id!,
            date: date.trim()
        }
    })

    res.status(200).json({
        result: transaction,
        meta: null,
        message: 'Transaction created successfully'
    })
})

const getAllTransaction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { ty, c, fd, td, t, page=1, limit=2} = req.query

    const currentUser = req.userInfo

    const filters: any = {
        userId: currentUser?.id
    }

    if (ty) filters.type = ty;
    if (c) filters.category = {
        name: c
    };
    if (fd && td) {
        filters.date = {
            gte: new Date(fd as string),
            lte: new Date(td as string),
        };
    } else if (fd) {
        filters.date = { gte: new Date(fd as string) };
    } else if (td) {
        filters.date = { lte: new Date(td as string) };
    }

    if(t){
        filters.title = {
            contains: t as string,
            mode: 'insensitive'
        }
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const transaction = await prisma.transaction.findMany({
        where: filters,
        orderBy: {
            date: "desc"
        },
        skip: (pageNum - 1) * limitNum,
        take: limitNum
    })
    
    const totalCount = await prisma.transaction.count({
        where: filters,
    });

    res.status(200).json({
        result: transaction,
        meta: {
            total: totalCount,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(totalCount / limitNum)
        },
        message: 'Your transaction list'
    })
})

export {
    addTransaction,
    getAllTransaction
}