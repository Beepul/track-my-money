import TransactionForm from "@/components/layout/private/transaction/TransactionForm.component";
import { getAllCategoryApi } from "../../category/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";



export default async function AddTransactionPage ( ) {
    const categoryList = await getAllCategoryApi()
    const categories = categoryList.success ? categoryList.data : [];
    return (
        <main className="flex">
            <div className="bg-white m-auto p-8 shadow-sm rounded-lg min-w-[650px]"> 
                <div className="flex items-center gap-2 mb-1">
                    <Link href="/dashboard/transaction"><ArrowLeft /></Link>
                    <h2 className="text-xl font-medium text-t2m-text-primary">
                        Create New Transaction
                    </h2>
                </div>
                <p className="mb-5">Add your income or expense details below</p>
                <>
                    <TransactionForm categoryList={categoryList.data} mode="create"/>
                </>
            </div>
        </main>
    )
}


