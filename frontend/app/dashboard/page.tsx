import { ArrowDown, ArrowUp, CreditCard, Plus } from 'lucide-react';
import Link from 'next/link';


export default function DashboardPage ( ) {
    return (
        <div>
            <div className='flex gap-6 mb-6'>
                <div className="bg-white p-4 flex items-center justify-between rounded-lg flex-1">
                    <div>
                        <p className='mb-2'>Total Income</p>
                        <h2 className="text-t2m-secondary font-bold text-xl">$5,420</h2>
                    </div>
                    <span className='bg-t2m-bg-secondary h-12 w-12 flex items-center justify-center rounded-full'>
                        <ArrowUp className='text-t2m-secondary'/>
                    </span>
                </div>
                <div className="bg-white p-4 flex items-center justify-between rounded-lg flex-1">
                    <div>
                        <p className='mb-2'>Total Expenses</p>
                        <h2 className="text-red-400 font-bold text-xl">$3,420</h2>
                    </div>
                    <span className='bg-red-100 h-12 w-12 flex items-center justify-center rounded-full'>
                        <ArrowDown className='text-red-400'/>
                    </span>
                </div>
                <div className="bg-white p-4 flex items-center justify-between rounded-lg flex-1">
                    <div>
                        <p className='mb-2'>Balance</p>
                        <h2 className="text-t2m-primary font-bold text-xl">$1,420</h2>
                    </div>
                    <span className='bg-t2m-bg-primary h-12 w-12 flex items-center justify-center rounded-full'>
                        <CreditCard className='text-t2m-primary'/>
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <div className='bg-white flex-1 p-4 rounded-lg mb-6'>
                    <h4 className='font-semibold text-xl text-t2m-text-primary'>Monthly Overview</h4>
                </div>
                <div className='bg-white flex-1 p-4 rounded-lg mb-6'>
                    <h4 className='font-semibold text-xl text-t2m-text-primary'>Expense Category</h4>
                </div>
            </div>
            <div className='bg-white rounded-lg p-4'>
                <div className='mb-6 flex items-center justify-between'>
                    <h4 className='font-semibold text-xl text-t2m-text-primary'>Recent Transactions</h4>
                    <Link href={"#"} className='text-blue-400'>View All</Link>
                </div>
                <div>
                    <ul>
                        <li className='flex items-center justify-between pb-4 border-b mb-4'>
                            <div className='flex'>
                                <span className='bg-red-100 h-12 w-12 flex items-center justify-center rounded-full mr-4'>
                                    <ArrowDown className='text-red-400'/>
                                </span>
                                <div>
                                    <h6 className='text-t2m-text-primary'>Groceries</h6>
                                    <p className='text-sm'>Expense • Today</p>
                                </div>
                            </div>
                            <p className='text-red-400 text-lg'>-$100</p>
                        </li>
                        <li className='flex items-center justify-between pb-4 border-b mb-4'>
                            <div className='flex'>
                                <span className='bg-t2m-bg-secondary h-12 w-12 flex items-center justify-center rounded-full mr-4'>
                                    <Plus className='text-t2m-secondary'/>
                                </span>
                                <div>
                                    <h6 className='text-t2m-text-primary'>Salary</h6>
                                    <p className='text-sm'>Income • Today</p>
                                </div>
                            </div>
                            <p className='text-t2m-secondary text-lg'>-$100</p>
                        </li>
                        <li className='flex items-center justify-between'>
                            <div className='flex'>
                                <span className='bg-red-100 h-12 w-12 flex items-center justify-center rounded-full mr-4'>
                                    <ArrowDown className='text-red-400'/>
                                </span>
                                <div>
                                    <h6 className='text-t2m-text-primary'>Bike</h6>
                                    <p className='text-sm'>Expense • Today</p>
                                </div>
                            </div>
                            <p className='text-red-400 text-lg'>-$100</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}