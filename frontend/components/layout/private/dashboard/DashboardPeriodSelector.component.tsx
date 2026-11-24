
"use client"

import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"

import { useApp } from "@/app/context/AppProvider"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const periods = [
    { label: "Weekly", value: "w" },
    { label: "Monthly", value: "m" },
    { label: "Yearly", value: "y" }
]

export default function DashboardPeriodSelector() {
    const { preferences } = useApp()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [pending, startTransition] = useTransition()

    const periodMap = {
        WEEKLY: "w",
        MONTHLY: "m",
        YEARLY: "y"
    } as const

    const currentPeriod =
        searchParams.get("period") ||
        periodMap[preferences.defaultPeriod]

    const selectedPeriod = periods.find(
        period => period.value === currentPeriod
    )

    const changePeriod = (value: string) => {
        startTransition(() => {
            router.push(`/dashboard?period=${value}`)
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    disabled={pending}
                    className="min-w-[120px] justify-between cursor-pointer"
                >
                    {selectedPeriod?.label || "Monthly"}
                    <ChevronDown className="h-4 w-4 opacity-60" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-[120px]">
                {periods.map(period => (
                    <DropdownMenuItem
                        key={period.value}
                        onSelect={() => changePeriod(period.value)}
                        className="cursor-pointer flex items-center justify-between"
                    >
                        {period.label}

                        {currentPeriod === period.value && (
                            <Check className="h-4 w-4 text-t2m-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
