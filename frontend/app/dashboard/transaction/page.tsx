import TransactionTable from "@/components/layout/private/transaction/TransactionTable.component";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { GetAllTransactionApi } from "./api";
import { getAllCategoryApi } from "../category/api";
import { cookies } from "next/headers";
import TransactionTblFilter from "@/components/layout/private/transaction/TransactionTblFilter.component";

type TransactionsPageProps = {
    searchParams : {
        page?: string,
        limit?: string,
        search?: string,
    }
}

export default async function TransactionsPage ({searchParams}: TransactionsPageProps ) {
    const params = await searchParams;

    const cookieStore = await cookies();
    const filterCookie = cookieStore.get("T2M_TRANSACTION_FILTERS")?.value;
    const filters = filterCookie ? JSON.parse(filterCookie) : {
        type: "all",
        categoryId: "all",
        fdate: "",
        tdate: "",
    };

    const page = Number(params.page || 1);
    const limit = Number(params.limit || 5);
    const search = params.search

    const transactionRes = await GetAllTransactionApi({
        page,
        limit, 
        search,
        type: filters.type === 'all' ? '' : filters.type,
        categoryId: filters.categoryId === 'all' ? '' : filters.categoryId,
        fdate: filters.fdate,
        tdate: filters.tdate,
    })
    const categoryList = await getAllCategoryApi()
    // console.log(transactionRes)
    return (
         <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between border-b pb-5 mb-5">
                <div>
                <h2 className="text-2xl font-semibold text-t2m-text-primary">
                    Your Transactions
                </h2>
                <p className="text-sm text-t2m-text-secondary mt-1">
                    Manage your income and expense transactions
                </p>
                </div>

                <Button asChild className="bg-t2m-primary px-6 hover:bg-t2m-secondary">
                    <Link href="/dashboard/transaction/add">
                        <Plus size={16} />
                        Add Transaction
                    </Link>
                </Button>
            </div>

            <TransactionTblFilter categoryList={categoryList.data} filters={filters}/>
            <TransactionTable 
                transactionData={transactionRes.data} 
                meta={transactionRes.meta} 
                searchPrams={search || ""}
                categoryList={categoryList.data}
                />
        </div>
    )
}