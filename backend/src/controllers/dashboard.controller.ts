import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import prisma from "../config/prisma.client";

type Period = "w" | "m" | "y";

const getStartDate = (period: Period) => {
    const now = new Date()
    if(period === 'w'){
        const start = new Date()
        start.setDate(now.getDate() - 7)
        start.setHours(0, 0, 0, 0);
        return start
    }
    if(period === 'y'){
        return new Date(now.getFullYear(), 0, 1)
    }
    return new Date(now.getFullYear(), now.getMonth(), 1)
}

const getDashboardStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {period} = req.params
    const startDate = getStartDate(period as 'w' | 'm' | 'y')
    const currentUser = req.userInfo

    const totalIncome = await prisma.transaction.aggregate({
        where: {
            type: "INCOME",
            userId: currentUser?.id,
            date: {
                gte: startDate
            }
        },
        _sum: {
            amount: true
        }
    })

    const totalExpense = await prisma.transaction.aggregate({
        where: {
            type: "EXPENSE",
            userId: currentUser?.id,
            date: {
                gte: startDate
            }
        },
        _sum: {
            amount: true
        }
    })

    const income = totalIncome._sum.amount || 0
    const expense = totalExpense._sum.amount || 0
    const balance = income - expense

    res.status(200).json({
        result: {
            totalIncome: income,
            totalExpense: expense,
            balance: balance,
            period: period
        },
        message: 'Your dashboard status',
        meta: null
    })
})

const getDashboardCharts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {period} = req.params
    const startDate = getStartDate(period as 'w' | 'm' | 'y')
    const currentUser = req.userInfo

    const transactions = await prisma.transaction.findMany({
        where: {
            userId: currentUser?.id,
            date: {
                gte: startDate
            }
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    icon: true
                }
            }
        },
        orderBy: {
            date: 'desc'
        }
    })

    const incomeExpenseMap = new Map<string, { label: string; income: number; expense: number }>();

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date)
        let label = ""
        if (period === "w") {
            label = date.toLocaleDateString("en-US", { weekday: "short" });
        } else if (period === "y") {
            label = date.toLocaleDateString("en-US", { month: "short" });
        } else {
            label = date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
            });
        }
        if (!incomeExpenseMap.has(label)) {
            incomeExpenseMap.set(label, {
                label,
                income: 0,
                expense: 0,
            });
        }

        const row = incomeExpenseMap.get(label)!;

        if (transaction.type === "INCOME") {
            row.income += transaction.amount;
        }

        if (transaction.type === "EXPENSE") {
            row.expense += transaction.amount;
        }
        
    })

    const expenseCategoryMap = new Map<string,{ category: string; amount: number; icon?: string | null }>();

    transactions
        .filter((transaction) => transaction.type === "EXPENSE")
        .forEach((transaction) => {
            const categoryName = transaction.category?.name || "Uncategorized";

            if (!expenseCategoryMap.has(categoryName)) {
                expenseCategoryMap.set(categoryName, {
                    category: categoryName,
                    amount: 0,
                    icon: transaction.category?.icon,
                });
            }

            expenseCategoryMap.get(categoryName)!.amount += transaction.amount;
        });

    console.log(Array.from(incomeExpenseMap.values()))
    console.log(Array.from(expenseCategoryMap.values()))

    res.status(200).json({
        result: {
            period: period,
            incomeExpenseChart: Array.from(incomeExpenseMap.values()),
            expenseByCategory: Array.from(expenseCategoryMap.values()),
        },
        message: 'Your dashboard charts',
        meta: null
    })
})


export {
    getDashboardStats,
    getDashboardCharts
}