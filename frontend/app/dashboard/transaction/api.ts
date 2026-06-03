import { API_BASE_URL } from "@/config/api.config";
import { apiFetch } from "@/lib/apiFetch";

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
        message: ''
    }
}



export async function GetAllTransaction(){
    const res = await apiFetch(`${API_BASE_URL}/transaction`)
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