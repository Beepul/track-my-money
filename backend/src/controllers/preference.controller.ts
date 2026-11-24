import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import prisma from "../config/prisma.client";
import { AppTheme, CurrencyPosition, DashboardPeriod } from "@prisma/client";


const getUserPreference = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userInfo?.id!;

    const preferences = await prisma.userPreference.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    res.status(200).json({
      success: true,
      preferences,
    });
})

// UPDATE USER PREFERENCES
const updateUserPreference = catchAsync(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.userInfo!.id;

    const {
        currency,
        currencyPosition,
        defaultPeriod,
        recentTransactionCount,
        theme
    } = req.body;

    const validCurrencies = ["AUD", "USD", "NPR", "INR", "GBP", "EUR"];

    if (
        (currency !== undefined &&
            (typeof currency !== "string" || !validCurrencies.includes(currency))) ||
        (currencyPosition !== undefined &&
            !Object.values(CurrencyPosition).includes(currencyPosition)) ||
        (defaultPeriod !== undefined &&
            !Object.values(DashboardPeriod).includes(defaultPeriod)) ||
        (recentTransactionCount !== undefined &&
            (!Number.isInteger(recentTransactionCount) ||
                recentTransactionCount < 1 ||
                recentTransactionCount > 50)) ||
        (theme !== undefined &&
            !Object.values(AppTheme).includes(theme))
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid preference values"
        });
    }

    const preferences = await prisma.userPreference.upsert({
        where: { userId },
        update: {
            currency,
            currencyPosition,
            defaultPeriod,
            recentTransactionCount,
            theme
        },
        create: {
            userId,
            ...(currency !== undefined && { currency }),
            ...(currencyPosition !== undefined && { currencyPosition }),
            ...(defaultPeriod !== undefined && { defaultPeriod }),
            ...(recentTransactionCount !== undefined && { recentTransactionCount }),
            ...(theme !== undefined && { theme })
        }
    });

    res.status(200).json({
        success: true,
        message: "Preferences updated successfully",
        preferences
    });
});



export { getUserPreference, updateUserPreference };