
import TransactionForm from "@/components/layout/private/transaction/TransactionForm.component"
import { GetTransactionByIdApi } from "../../api"
import { getAllCategoryApi } from "@/app/dashboard/category/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function EditTransaction({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const transaction = await GetTransactionByIdApi(id)
    const category = await getAllCategoryApi()

    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 border-b border-border pb-5 mb-6">
                <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                    <Link href="/dashboard/transaction">
                        <ArrowLeft size={18} />
                    </Link>
                </Button>

                <div>
                    <h2 className="text-2xl font-semibold text-t2m-text-primary">
                        Update your transaction &quot;
                        <span className="capitalize">
                            {transaction.data?.title}
                        </span>
                        &quot;
                    </h2>

                    <p className="text-sm text-t2m-text-secondary">
                        Update your transaction details below
                    </p>
                </div>
            </div>

            <TransactionForm
                categoryList={category.data}
                mode="edit"
                transaction={transaction.data}
            />
        </div>
    )
}
