import DashboardFooter from "@/components/layout/private/dashboard/DashboardFooter.component"
import DashboardHeader from "@/components/layout/private/dashboard/DashboardHeader.component"
import DashboardSideBar from "@/components/layout/private/dashboard/DashboardSideBar.component"
import { GetMyProfileApi } from "./api"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default async function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    const userProfile = await GetMyProfileApi()

    if(!userProfile.success){
        alert("Please try loggin in again")
    }
   
    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <DashboardHeader user={userProfile.data}/>
            </div>
            <div className="flex-1 flex items-stretch">
                <DashboardSideBar />
                <main className="flex-1 p-5 py-10 bg-t2m-bg-gray">
                    {children}
                </main>
            </div>
            <div className="fixed bottom-10 right-10">
                <Link href={"/dashboard/transaction/add"} className="w-16 h-16 bg-t2m-primary cursor-pointer rounded-full flex items-center justify-center hover:bg-teal-600"><Plus size={26} className="text-white" /></Link>
            </div>
            <DashboardFooter />
        </div>
    )
}