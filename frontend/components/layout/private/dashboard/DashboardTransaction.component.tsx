import { Transaction } from "@/app/dashboard/transaction/actions";
import { ArrowDown, Plus } from "lucide-react";
import Link from "next/link";

type DashboardTransaction = {
    transactionList : Transaction[]
}

function formatDate(date: string) {
    const inputDate = new Date(date);

    if (
        inputDate.toDateString() === new Date().toDateString()
    ) {
        return "Today";
    }

    return inputDate.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function DahsboardTrasaction ({transactionList}: DashboardTransaction) {
    return (
        <section>
            <div className='bg-white rounded-lg lg:p-6 p-3 shadow-sm'>
                <div className='mb-6 flex items-center justify-between'>
                    <h4 className='font-semibold text-xl text-t2m-text-primary'>Recent Transactions</h4>
                    <Link href={"/dashboard/transaction"} className='text-blue-400'>View All</Link>
                </div>
                <div>
                    <ul>
                        {transactionList.map((transaction, i) => (
                            <li  key={transaction.id}>
                                <Link
                                    href={`/dashboard/transaction/${transaction.id}`}
                                    className={`flex items-center justify-between rounded-lg px-3 py-3 transition-all duration-200 hover:bg-t2m-bg-primary hover:border-b-t2m-bg-primary ${
                                        i === transactionList.length - 1 ? "" : " border-b"
                                    }`}
                                >
                                    <div className='flex'>
                                        <span className={`${transaction.type === "EXPENSE" ? 'bg-red-100' : 'bg-t2m-bg-secondary'} h-12 w-12 flex items-center justify-center rounded-full mr-4`}>
                                            {transaction.type === "EXPENSE" ? (
                                                <ArrowDown className='text-red-400'/>
                                            ): (
                                                <Plus className='text-t2m-secondary'/>
                                            )}
                                        </span>
                                        <div>
                                            <h6 className='text-t2m-text-primary capitalize '>
                                                {transaction.title}
                                            </h6>
                                            <p className='text-sm'><span className="capitalize">{transaction.type.toLowerCase()}</span> • <span>{formatDate(transaction.date)}</span></p>
                                        </div>
                                    </div>

                                    {
                                        transaction.type == "EXPENSE" ? (
                                            <p className='text-red-400 text-lg'>-${transaction.amount}</p>
                                        ) : (
                                            <p className='text-t2m-secondary text-lg'>+${transaction.amount}</p>
                                        )
                                    }
                                 </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}