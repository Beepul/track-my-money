import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import prisma from "../config/prisma.client";

const getReportData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {fromDate, toDate, category, type, page=1, limit=2} = req.query
    const currentUser = req.userInfo

    if(!fromDate || !toDate){
        throw {
            message: "Please provide valid dates",
            status: 400
        }
    }

    const startDate = new Date(fromDate as string);
    const endDate = new Date(toDate as string);

    if (startDate > endDate) {
        throw {
            message: "From date cannot be greater than to date",
            status: 400,
        };
    }

    endDate.setHours(23, 59, 59, 999);

    const filters: any = {
        userId: currentUser?.id!,
        date: {
            gte: startDate,
            lte: endDate,
        },
    };

    if (category && category !== "all") {
        filters.categoryId = category as string;
    }

    if (type && type !== "ALL") {
        filters.type = type as "INCOME" | "EXPENSE";
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const transactions = await prisma.transaction.findMany({
        where: filters,
        include: {
            category: {
            select: {
                id: true,
                name: true,
                icon: true,
            },
            },
        },
        orderBy: {
            date: "asc",
        },
        skip: (pageNum - 1) * limitNum,
        take: limitNum
    });

    const totalIncome = transactions
      .filter((item) => item.type === "INCOME")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
      .filter((item) => item.type === "EXPENSE")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalCount = await prisma.transaction.count({
        where: filters,
    });

    res.status(200).json({
        message: "Report data generated successfully",
        result: {
            summary: {
                totalIncome,
                totalExpense,
                netAmount: totalIncome - totalExpense,
                totalTransactions: transactions.length,
            },
            transactions,
        },
        meta: {
            total: totalCount,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(totalCount / limitNum)
        },
    });
})
const getDownloadbleReport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {fromDate, toDate, category, type} = req.query
    const currentUser = req.userInfo

    if(!fromDate || !toDate){
        throw {
            message: "Please provide valid dates",
            status: 400
        }
    }

    const startDate = new Date(fromDate as string);
    const endDate = new Date(toDate as string);

    if (startDate > endDate) {
        throw {
            message: "From date cannot be greater than to date",
            status: 400,
        };
    }

    endDate.setHours(23, 59, 59, 999);

    const filters: any = {
        userId: currentUser?.id!,
        date: {
            gte: startDate,
            lte: endDate,
        },
    };

    if (category && category !== "all") {
        filters.categoryId = category as string;
    }

    if (type && type !== "ALL") {
        filters.type = type as "INCOME" | "EXPENSE";
    }

    const transactions = await prisma.transaction.findMany({
        where: filters,
        include: {
            category: {
            select: {
                id: true,
                name: true,
                icon: true,
            },
            },
        },
        orderBy: {
            date: "asc",
        }
    });

    const totalIncome = transactions
      .filter((item) => item.type === "INCOME")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
      .filter((item) => item.type === "EXPENSE")
      .reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({
        message: "Downloadable report data generated successfully",
        result: {
            summary: {
                totalIncome,
                totalExpense,
                netAmount: totalIncome - totalExpense,
                totalTransactions: transactions.length,
            },
            transactions,
        },
        meta: null
    });
})

export {
    getReportData,
    getDownloadbleReport
}