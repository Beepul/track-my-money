import DashboardFooter from "@/components/layout/private/dashboard/DashboardFooter.component"
import DashboardHeader from "@/components/layout/private/dashboard/DashboardHeader.component"
import DashboardSideBar from "@/components/layout/private/dashboard/DashboardSideBar.component"
import { GetMyProfileApi } from "./api"


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
        </div>
    )
}