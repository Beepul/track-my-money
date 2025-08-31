import Link from "next/link";
import { ChartBar, House, Plus, Settings, Tag, Tags } from 'lucide-react';

export default function DashboardSideBar() {
    return (
        <aside className="bg-white p-4 h-full shadow-sm">
            <Link href={"/"} className="flex gap-2 items-center text-t2m-text-primary mb-8">
                <span className="bg-t2m-primary py-1 px-2 text-xs inline-block text-white rounded-md font-semibold">T2M</span> 
                <span className="font-bold">
                    Track My Money 
                </span>
            </Link>
            <div>
                <ul>
                    <li className="mb-8">
                        <Link href={"#"} className="flex items-center gap-2 hover:text-t2m-primary transition-all duration-300 text-t2m-primary">
                            <House size={16}/>
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-8">
                        <Link href={"#"} className="flex items-center gap-2 hover:text-t2m-primary transition-all duration-300">
                            <Plus size={16}/>
                            Transaction
                        </Link>
                    </li>
                    <li className="mb-8">
                        <Link href={"#"} className="flex items-center gap-2 hover:text-t2m-primary transition-all duration-300">
                            <Tags size={16}/>
                            Categories
                        </Link>
                    </li>
                    <li className="mb-8">
                        <Link href={"#"} className="flex items-center gap-2 hover:text-t2m-primary transition-all duration-300">
                            <ChartBar size={16}/>
                            Reports
                        </Link>
                    </li>
                    <li className="mb-8">
                        <Link href={"#"} className="flex items-center gap-2 hover:text-t2m-primary transition-all duration-300">
                            <Settings size={16}/>
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}