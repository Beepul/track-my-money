import { API_BASE_URL } from "@/config/api.config";
import { apiFetch } from "@/lib/apiFetch";
import { Transaction } from "./actions";

export type AddTransactionPayload = {
    title: string;
    amount: number;
    note?: string; 
    type: "INCOME" | "EXPENSE";
    categoryId: string;
    date: Date,
    image?: Blob
}
type AddTransactionReturn = {
    success: boolean;
    message: string;
}

export async function AddTransactionApi(payload: AddTransactionPayload): Promise<AddTransactionReturn> {
    console.log("payload", payload)


    const formData = new FormData();
    for (const [key, value] of formData.entries()) {
        console.log('formData entry:', key, value);
    }

    formData.append("title", payload.title);
    formData.append("amount", String(payload.amount));
    formData.append("type", payload.type);
    formData.append("categoryId", payload.categoryId);
    formData.append("date", payload.date.toISOString());

    if (payload.note) {
    formData.append("note", payload.note);
    }

    if (payload.image && payload.image.size > 0) {
        formData.append("receipt", payload.image);
    }

    const res = await apiFetch(`${API_BASE_URL}/transaction`, {
        method: "POST",
        body: formData,
    });

    
    const data = await res.json();
    

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Transaction failed",
        };
    }
    return {
        success: true,
        message: data.message || "Transaction created successfully"
    }
}



export async function GetAllTransactionApi({page=1, limit=2, search, type, categoryId, fdate,tdate}: {page: number, limit: number, search?: string, type?: string, categoryId?: string, fdate?: string, tdate?: string}){
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    })
    if(search) {
        params.append('t', search)
    }
    if(type){
        params.append('ty', type)
    }
    if(categoryId){
        params.append('c', categoryId)
    }
    if(fdate && tdate){
        params.append('fd', fdate)
        params.append('td', tdate)
    }
    
   
    const res = await apiFetch(`${API_BASE_URL}/transaction?${params.toString()}`)
    const data = await res.json()

    if(!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to load transactions"
        }
    }

    return {
        success: true,
        message: data.message,
        data: data.result,
        meta: data.meta
    }
}


export async function DeleteTransactionApi(id: string){
    const res = await apiFetch(`${API_BASE_URL}/transaction/${id.toString()}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if(!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to delete transaction"
        }
    }

    return {
        success: true,
        message: data.message
    }
}

export async function GetTransactionByIdApi(id:string): Promise<{success: boolean, message: string, data?: Transaction}> {
    const res = await apiFetch(`${API_BASE_URL}/transaction/${id.toString()}`)


    const data = await res.json()

    if(!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to delete transaction"
        }
    }

    return {
        success: true,
        message: data.message,
        data: data.result
    }
}


export async function UpdateTransactionApi(payload: AddTransactionPayload, id: string): Promise<AddTransactionReturn> {

    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("amount", String(payload.amount));
    formData.append("type", payload.type);
    formData.append("categoryId", payload.categoryId);
    formData.append("date", payload.date.toISOString());

    if (payload.note) {
        formData.append("note", payload.note);
    }

    if (payload.image && payload.image.size > 0) {
        formData.append("receipt", payload.image);
    }

    console.log("Hereee::", formData)

    const res = await apiFetch(`${API_BASE_URL}/transaction/${id}`, {
        method: "PUT",
        body: formData,
        // cache: "no-store",
    });

    
    const data = await res.json();
    

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to update transaction",
        };
    }
    return {
        success: true,
        message: data.message
    }
}