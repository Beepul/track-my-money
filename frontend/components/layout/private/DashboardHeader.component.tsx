import Image from "next/image";
import profile from "@/public/images/profile.jpg"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


export default function DashboardHeader() {
    return (
        <header className="flex items-center shadow-sm lg:p-6 p-3 bg-white">
            <h2 className="text-lg lg:text-2xl text-t2m-text-primary font-bold">Dashboard</h2>
            <div className="flex-1 flex  items-center justify-end gap-3">
                <p className="text-t2m-text-secondary">Welcome back, <span>John Doe</span></p>
                <Image src={profile} height={30} width={30} alt="profile" className="rounded-full"/>
            </div>
            <Sheet>
  <SheetTrigger>
    {/* <TextAli /> */}
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
        </header>
    )
}