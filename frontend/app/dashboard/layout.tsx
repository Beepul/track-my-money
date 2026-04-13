import DashboardFooter from "@/components/layout/private/DashboardFooter.component"
import DashboardHeader from "@/components/layout/private/DashboardHeader.component"
import DashboardSideBar from "@/components/layout/private/DashboardSideBar.component"

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <div>
                <DashboardHeader />
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