import { API_BASE_URL } from "@/config/api.config"
import { apiFetch } from "@/lib/apiFetch"
import { cookies } from "next/headers"
import { cache } from "react"

export type User = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  password?: string,
  image: string | null,
  googleId?: string | null,
  createdAt: string
}

export const GetMyProfileApi = async () => {
    const res = await apiFetch(`${API_BASE_URL}/user/profile`)
    const data = await res.json() 
    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to load profile",
        } 
    }

    return {
        success: true, 
        message: data.message,
        data: data.result
    }
}

type DashboardApiReturnType = {
    success: boolean,
    message: string,
    data?: {
        totalIncome: number,
        totalExpense: number,
        balance: number,
        period: 'w' | 'm' | 'y'
    }
}

export const GetDashboardDataApi = async ({period="m"}: {period: string}): Promise<DashboardApiReturnType> => {
    const res = await apiFetch(`${API_BASE_URL}/dashboard/stats/${period}`)
    const data = await res.json()

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to load dashboard data",
        } 
    }

    return {
        success: true, 
        message: data.message,
        data: data.result
    }
}

type DashboardChartsReturnType = {
    success: boolean,
    message: string,
    data?: {
        period: string,
        incomeExpenseChart: {
            label: string,
            income: number, 
            expense: number 
        }[],
        expenseByCategory: {
            category: string,
            amount: number,
            icon: string
        }[]
    }
}
export const GetDashboardChartsApi = async ({period="m"}: {period: string}): Promise<DashboardChartsReturnType> => {
    const res = await apiFetch(`${API_BASE_URL}/dashboard/charts/${period}`)
    const data = await res.json()

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to load dashboard data",
        } 
    }

    return {
        success: true, 
        message: data.message,
        data: data.result
    }
}

export type UserPreference = {
    id: string,
    userId: string,
    currency: string,
    currencyPosition: "BEFORE" | "AFTER",
    defaultPeriod: "WEEKLY" | "MONTHLY" | "YEARLY";
    recentTransactionCount: number,
    theme: "LIGHT" | "DARK",
    createdAt: string,
    updatedAt: string
}

type UserPreferenceApiReturnType = {
    success: boolean,
    message: string,
    data?: UserPreference
}

export const GetUserPreferenceApi = cache(async (): Promise<UserPreferenceApiReturnType> => {
    const res = await apiFetch(`${API_BASE_URL}/preference`)
    const data = await res.json()

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to load preferences",
        }
    }

    return {
        success: true,
        message: data.message || "Preferences loaded successfully",
        data: data.preferences
    }
})

export type UpdatePreferencePayload = Partial<Pick<
    UserPreference,
    | "currency"
    | "currencyPosition"
    | "defaultPeriod"
    | "recentTransactionCount"
    | "theme"
>>;

export const UpdateUserPreferenceApi = async (
    payload: UpdatePreferencePayload
): Promise<UserPreferenceApiReturnType> => {
    const res = await apiFetch(`${API_BASE_URL}/preference`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to update preferences"
        };
    }

    return {
        success: true,
        message: data.message || "Preferences updated successfully",
        data: data.preferences
    };
};