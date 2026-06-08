"use server"
import { AddTransactionSchema } from "@/lib/zod.definitions";
import { AddTransactionApi } from "./api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Category } from "../category/actions";

export type Transaction = {
    id: string;
    userId: string;
    title: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    categoryId: string;
    date: string;
    note: string | null;
    image: string | null;
    category?: Category;
};

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

type FilterState = {
  success?: boolean;
  message?: string;
};

// type FilterReturnType = {
//     success?: boolean;
//     message?: string;
//     data?: Transaction[],
//     errors?: {
//         type?: string[];
//         categoryId?: string[];
//         fdate?: string[];
//         tdate?: string[];
//     } 
// }

export async function applyFilterActions (prevState: FilterState,formData: FormData): Promise<FilterState>  {

    const filters = {
        type: String(formData.get("type") || "all"),
        categoryId: String(formData.get("category") || "all"),
        fdate: String(formData.get("fdate") || ""),
        tdate: String(formData.get("tdate") || ""),
    };
    // console.log("Filter::::", filters)

    const cookieStore = await cookies();

    cookieStore.set("T2M_TRANSACTION_FILTERS", JSON.stringify(filters), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60,
    });
    redirect("/dashboard/transaction?page=1&limit=5");
}


export async function resetFilterActions() {
    const cookieStore = await cookies();
    const filters = cookieStore.get('T2M_TRANSACTION_FILTERS')?.value
    if(filters){
        cookieStore.delete('T2M_TRANSACTION_FILTERS')
    }
    revalidatePath("/dashboard/transaction")
    redirect("/dashboard/transaction?page=1&limit=5");
}