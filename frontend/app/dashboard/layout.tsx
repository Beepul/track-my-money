import DashboardFooter from "@/components/layout/private/DashboardFooter.component"
import DashboardHeader from "@/components/layout/private/DashboardHeader.component"
import DashboardSideBar from "@/components/layout/private/DashboardSideBar.component"

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-gray-50 flex flex-col gap-2 min-h-dvh">
            <div>
                <DashboardHeader />
            </div>
            <div className="flex flex-1">
                <div className="min-h-full">
                    <DashboardSideBar />
                </div>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
            <DashboardFooter />
        </div>
    )
}