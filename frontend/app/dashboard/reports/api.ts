import { API_BASE_URL } from "@/config/api.config";
import { apiFetch } from "@/lib/apiFetch";
import { Transaction } from "../transaction/actions";

type Report = {
    success: boolean,
    message: string,
    data?: {
        summary: {
            totalIncome: number,
            totalExpense: number,
            netAmount: number,
            totalTransactions: number
        },
        transactions: Transaction[],
        meta: {
            total: number,
            page: number,
            limit: number,
            totalPages: number
        }
    }
}
export type DownloadableReport = {
    success: boolean,
    message: string,
    data?: {
        summary: {
            totalIncome: number,
            totalExpense: number,
            netAmount: number,
            totalTransactions: number
        },
        transactions: Transaction[]
    }
}

export async function GetReportDataApi({fromDate, toDate, category, type, page, limit}: {fromDate: string, toDate: string, category: string, type: string, page: number, limit: number}):Promise<Report> {
    const res = await apiFetch(`${API_BASE_URL}/report?fromDate=${fromDate}&toDate=${toDate}&category=${category}&type=${type}&page=${page}&limit=${limit}`)
    const data = await res.json()
    if(!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to generate report"
        }
    }

    return {
        success: true,
        message: data.message,
        data: {
            summary: data.result.summary,
            transactions: data.result.transactions,
            meta: data.meta
        }
    }
}
export async function GetDownloadableReportDataApi({fromDate, toDate, category, type}: {fromDate: string, toDate: string, category: string, type: string}):Promise<DownloadableReport> {
    const res = await apiFetch(`${API_BASE_URL}/report/downloadable?fromDate=${fromDate}&toDate=${toDate}&category=${category}&type=${type}`)
    const data = await res.json()
    if(!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to generate report"
        }
    }

    return {
        success: true,
        message: data.message,
        data: {
            summary: data.result.summary,
            transactions: data.result.transactions
        }
    }
}