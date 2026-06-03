import TransactionTable from "@/components/layout/private/TransactionTable.component";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { GetAllTransaction } from "./api";

export default async function ViewTransactionPage ( ) {
    const transactionRes = await GetAllTransaction()
    console.log(transactionRes)
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

            <TransactionTable transactionData={transactionRes.data} meta={transactionRes.meta}/>
        </div>
    )
}