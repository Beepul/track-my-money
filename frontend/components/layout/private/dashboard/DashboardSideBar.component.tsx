
"use client"
import Link from "next/link";
import { ChartBar, House, PanelLeft, Plus, Settings, Tag, Tags } from 'lucide-react';
import { usePathname } from "next/navigation";

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
    const pathname = usePathname()
 
    const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: House,
    },
    {
      title: "Transaction",
      href: "/dashboard/transaction",
      icon: Plus,
    },
    {
      title: "Categories",
      href: "/dashboard/category",
      icon: Tags,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: ChartBar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];
  
    return (
        <ul className="p-5">
            {menuItems.map((item, key) => {
                const Icon = item.icon
                const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
                return (
                    <li className="mb-3" key={key}>
                        {isActive ? <>
                            <div className="flex items-center gap-2 p-3 rounded-sm duration-300 text-t2m-primary bg-t2m-bg-primary">
                                <Icon size={16}/>
                                <p>{item.title}</p>
                            </div>
                        </> : <>
                            <Link href={item.href} className="flex items-center gap-2 p-3 rounded-sm hover:text-t2m-primary hover:bg-gray-50 transition-all duration-300">
                                <Icon size={16}/>
                                {item.title}
                            </Link>
                        </>}
                    </li>
                )
            })}
        </ul>
    )
}