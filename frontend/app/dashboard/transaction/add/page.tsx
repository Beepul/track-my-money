
import TransactionForm from "@/components/layout/private/transaction/TransactionForm.component";
import { getAllCategoryApi } from "../../category/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AddTransactionPage() {
    const categoryList = await getAllCategoryApi();
    const categories = categoryList.success ? categoryList.data : [];

    return (
        <main className="flex w-full justify-center">
            <div className="w-full max-w-[650px] bg-card text-card-foreground border border-border p-6 sm:p-8 shadow-sm rounded-lg">

                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <Link
                        href="/dashboard/transaction"
                        aria-label="Back to transactions"
                        className="text-t2m-text-primary hover:text-t2m-primary transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>

                    <h2 className="text-xl font-medium text-t2m-text-primary">
                        Create New Transaction
                    </h2>
                </div>

                <p className="mb-5 text-sm text-t2m-text-secondary">
                    Add your income or expense details below
                </p>

                {/* Transaction Form */}
                <TransactionForm
                    categoryList={categories}
                    mode="create"
                />
            </div>
        </main>
    );
}
