"use server"
import { AddTransactionSchema } from "@/lib/zod.definitions";
import { AddTransactionApi } from "./api";
import { revalidatePath } from "next/cache";

export type AddTransactionFormState = {
    success?: boolean;
    message?: string;
    data?: {
        title?: string;
        amount?: number;
        note?: string; 
        type?: "INCOME" | "EXPENSE";
        categoryId?: string;
        date?: string;
        image: Blob | null
    },
    errors?: {
        title?: string[];
        amount?: string[];
        note?: string[];
        type?: string[];
        categoryId?: string[];
        date?: string[];
        image?: string[];
    } 
}
export async function addTransaction (prevState: AddTransactionFormState, formData: FormData): Promise<AddTransactionFormState> {
    const rawData = {
        title: String(formData.get("title") ?? ""),
        amount: Number(formData.get("amount") ?? 0),
        note: String(formData.get("note") ?? ""),
        type: formData.get("type") as "INCOME" | "EXPENSE",
        categoryId: String(formData.get("categoryId") ?? ""),
        date: String(formData.get("date") ?? ""),
        image: formData.get("image") as Blob | null,
    }

    

    const validateFields = AddTransactionSchema.safeParse(rawData)
    

    if(!validateFields.success){
        return {
            errors: validateFields.error.flatten().fieldErrors,
            success: false,
            data: rawData,
            message: "Please fix the errors in the form.",
        }
    }

    console.log(validateFields.data)

    const transactionRes = await AddTransactionApi(validateFields.data)

    if( !transactionRes.success){
      return {
        errors: {},
        success: false,
        // data: {},
        message: transactionRes.message
      }
    }

    revalidatePath("/dashboard/transaction")

    return {
        success: true,
        message: "Transaction created successfully.",
        errors: {},
        // data: {}
    };  

}