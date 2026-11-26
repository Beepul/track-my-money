"use client"
import Image from "next/image";
import profile from "@/public/images/profile-1.jpg"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, CircleUserRound, Kanban, LockKeyhole, LogOut, Moon, Sun } from "lucide-react";
import { MobileSideBar } from "./DashboardSideBar.component";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { logout } from "@/app/dashboard/actions";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggler from "../ui/ThemeToggler.component";
import { User } from "@/app/dashboard/api";
import { useApp } from "@/app/context/AppProvider";
import DashboardPeriodSelector from "./DashboardPeriodSelector.component";




export default function DashboardHeader({user}: {user: User}) {
  const { preferences } = useApp();
  const router = useRouter();
  const pathname = usePathname()
  const isDashboard = pathname.split('/').pop() == 'dashboard'

  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const periodMap = {
    WEEKLY: "w",
    MONTHLY: "m",
    YEARLY: "y"
} as const;

  const currentPeriod =
    searchParams.get("period") ||
    periodMap[preferences.defaultPeriod];

  const changePeriod = (value: string) => {
    startTransition(() => {
      router.push(`/dashboard?period=${value}`);
    });
  };


  console.log(user)

  const getProfilePlaceholder = () => {
    const firstCharacter = user.first_name?.trim().charAt(0) || "";
    const secondCharacter = user.last_name?.trim().charAt(0) || "";

    return `${firstCharacter}${secondCharacter}`.toUpperCase() || "U";
  };
  

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
            <h2 className="text-t2m-text-primary lg:text-3xl text-xl mb-2">
              Welcome Back,{" "}
              <span className="capitalize">
                {[user.first_name, user.last_name].filter(Boolean).join(" ")}!
              </span>
            </h2>
            <p className="text-sm lg:text-base text-t2m-text-secondary">Here's what happening with your transactions</p>
          </div>
        }
        <div className="flex-1 lg:flex items-center justify-end gap-5 hidden">
          <ThemeToggler />
          {isDashboard && <DashboardPeriodSelector />}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={`${user.first_name}'s profile`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-t2m-primary text-sm font-semibold text-white uppercase">
                    {getProfilePlaceholder()}
                  </span>
                )}
                <p className="capitalize">{user.first_name}{" "}{user.last_name}</p>
                <ChevronDown size={18} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                  <button
                      type="button"
                      onClick={() => void logout()}
                      className="flex w-full cursor-pointer items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                      <LogOut size={16} />
                      Logout
                  </button>
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