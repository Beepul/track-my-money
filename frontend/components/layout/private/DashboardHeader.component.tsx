"use client"
import Image from "next/image";
import profile from "@/public/images/profile-1.jpg"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, CircleUserRound, Kanban, LockKeyhole, LogOut } from "lucide-react";
import { MobileSideBar } from "./DashboardSideBar.component";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { usePathname } from "next/navigation";


export default function DashboardHeader() {
  const pathname = usePathname()
  const isDashboard = pathname.split('/').pop() == 'dashboard'

  return (
    <header className="flex items-center border-b">
      <div className="w-[225px] px-5 ">
        <Link href={"/"} className="flex gap-2 items-center text-t2m-text-primary">
            <span className="bg-t2m-primary py-2 px-2 text-xs inline-block text-white rounded-md font-semibold">T2M</span> 
            <span className="font-bold">
                Track My Money 
            </span>
        </Link>
      </div>
      <div className="flex items-center justify-content-between flex-1 border-l p-6">
        {isDashboard &&
          <div>
            <h2 className="text-t2m-text-primary lg:text-3xl text-xl mb-2">Welcome Back, <span>John!</span></h2>
            <p className="text-sm lg:text-base text-t2m-text-secondary">Here's what happening with your transactions</p>
          </div>
        }
        <div className="flex-1 lg:flex items-center justify-end gap-5 hidden">
          {
            isDashboard &&
            <NativeSelect defaultValue={'weekly'}>
              <NativeSelectOption value="weekly">Weekly</NativeSelectOption>
              <NativeSelectOption value="monthly">Monthly</NativeSelectOption>
              <NativeSelectOption value="yearly">Yearly</NativeSelectOption>
            </NativeSelect>
          }
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <div className="flex items-center gap-3">
                <Image src={profile} alt="profile" className="rounded-full object-cover h-[30px] w-[30px]" />
                <p>John Doe</p>
                <ChevronDown size={18} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={'#'} className="cursor-pointer">
                  <CircleUserRound />
                  Profile  
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'#'} className="cursor-point">
                  <LockKeyhole /> 
                  Change Password
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'#'} className="cursor-point">
                  <LogOut />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="lg:hidden block">
          <Sheet>
            <SheetTrigger className="cursor-pointer">
              <Kanban className="scale-[1.3] rotate-90" />
            </SheetTrigger>
            <SheetContent className="min-w-11/12">
              <SheetHeader>
                <SheetTitle>
                  <Link href={"/"} className="flex gap-2 items-center text-t2m-text-primary">
                    <span className="bg-t2m-primary py-2 px-2 text-xs inline-block text-white rounded-md font-semibold">T2M</span>
                    <span className="font-bold">
                      Track My Money
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <MobileSideBar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}