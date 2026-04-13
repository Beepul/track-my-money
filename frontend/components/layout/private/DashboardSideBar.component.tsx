import Link from "next/link";
import { ChartBar, House, PanelLeft, Plus, Settings, Tag, Tags } from 'lucide-react';

export default function DashboardSideBar() {
    return (
        <aside className="border-r">
            <div className="w-[225px]">
                <DashboardMenu />
            </div>
        </aside>
    )
}


export const MobileSideBar = () => {
    return (
        <div className="px-4">
            <DashboardMenu />
        </div>
    )
}



const DashboardMenu = () => {
    return (
        <ul className="p-5">
            <li className="mb-3">
                <Link href={"/dashboard"} className="flex items-center gap-2 p-3 rounded-sm transition-all duration-300 text-t2m-primary bg-t2m-bg-primary">
                    <House size={16}/>
                    Dashboard
                </Link>
            </li>
            <li className="mb-3">
                <Link href={"/dashboard/transaction/add"} className="flex items-center gap-2 p-3 rounded-sm hover:text-t2m-primary hover:bg-gray-50 transition-all duration-300">
                    <Plus size={16}/>
                    Transaction
                </Link>
            </li>
            <li className="mb-3">
                <Link href={"#"} className="flex items-center gap-2 p-3 rounded-sm hover:text-t2m-primary hover:bg-gray-50 transition-all duration-300">
                    <Tags size={16}/>
                    Categories
                </Link>
            </li>
            <li className="mb-3">
                <Link href={"#"} className="flex items-center gap-2 p-3 rounded-sm hover:text-t2m-primary hover:bg-gray-50 transition-all duration-300">
                    <ChartBar size={16}/>
                    Reports
                </Link>
            </li>
            <li className="mb-3">
                <Link href={"#"} className="flex items-center gap-2 p-3 rounded-sm hover:text-t2m-primary hover:bg-gray-50 transition-all duration-300">
                    <Settings size={16}/>
                    Settings
                </Link>
            </li>
        </ul>
    )
}