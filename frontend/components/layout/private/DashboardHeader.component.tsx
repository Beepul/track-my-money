import Image from "next/image";
import profile from "@/public/images/profile.jpg"

export default function DashboardHeader() {
    return (
        <header className="flex items-center shadow-sm p-4 bg-white">
            <h2 className="text-lg lg:text-2xl text-t2m-text-primary font-bold">Dashboard</h2>
            <div className="flex-1 flex  items-center justify-end gap-3">
                <p className="text-t2m-text-secondary">Welcome back, <span>John Doe</span></p>
                <Image src={profile} height={30} width={30} alt="profile" className="rounded-full"/>
            </div>
        </header>
    )
}