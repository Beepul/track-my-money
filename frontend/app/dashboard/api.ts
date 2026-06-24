import { API_BASE_URL } from "@/config/api.config"
import { apiFetch } from "@/lib/apiFetch"
import { cookies } from "next/headers"

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