
"use client"

import { useEffect, useState, type FormEvent } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "@/components/ui/field"
import {
    NativeSelect,
    NativeSelectOption
} from "@/components/ui/native-select"

import { updateUserPreferenceAction } from "@/app/dashboard/actions"
import type { UpdatePreferencePayload } from "@/app/dashboard/api"
import { useApp } from "@/app/context/AppProvider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingPreferences() {
    const { preferences, setPreferences } = useApp()

    const [formData, setFormData] = useState<UpdatePreferencePayload>({
        currency: preferences.currency,
        currencyPosition: preferences.currencyPosition,
        defaultPeriod: preferences.defaultPeriod,
        recentTransactionCount: preferences.recentTransactionCount,
        theme: preferences.theme
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Sync form when saved preferences change
    useEffect(() => {
        setFormData({
            currency: preferences.currency,
            currencyPosition: preferences.currencyPosition,
            defaultPeriod: preferences.defaultPeriod,
            recentTransactionCount: preferences.recentTransactionCount,
            theme: preferences.theme
        })
    }, [preferences])

    const handleChange = <K extends keyof UpdatePreferencePayload>(
        field: K,
        value: UpdatePreferencePayload[K]
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleCancel = () => {
        setFormData({
            currency: preferences.currency,
            currencyPosition: preferences.currencyPosition,
            defaultPeriod: preferences.defaultPeriod,
            recentTransactionCount: preferences.recentTransactionCount,
            theme: preferences.theme
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSubmitting) return

        setIsSubmitting(true)

        try {
            const response = await updateUserPreferenceAction(formData)

            if (!response.success || !response.data) {
                toast.error(response.message || "Failed to update preferences")
                return
            }

            // Update global app state
            setPreferences(response.data)

            toast.success("Preferences updated successfully")

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <div className="bg-white dark:bg-card p-12 rounded-md max-w-[850px] m-auto shadow-lg">
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend className="!text-xl !font-semibold">
                                Preferences
                            </FieldLegend>

                            <FieldDescription className="mb-4">
                                Customize how things appear on your Track My Money
                            </FieldDescription>

                            <FieldGroup>
                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="currency">
                                        1. Customize how amounts and currency are displayed.
                                    </FieldLabel>
                                    <div className="max-w-[200px]">
                                        <Select
                                            value={formData.currency}
                                            onValueChange={(value) => handleChange("currency", value)}
                                        >
                                            <SelectTrigger
                                                id="currency"
                                                className="w-full min-w-[200px] bg-background border-border text-foreground"
                                            >
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="AUD">Australian Dollar ($)</SelectItem>
                                                <SelectItem value="USD">American Dollar ($)</SelectItem>
                                                <SelectItem value="NPR">Nepali Rupee (Rs)</SelectItem>
                                                <SelectItem value="GBP">British Pound (£)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </Field>

                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="symbol">
                                        2. Customize how currency symbol to be appeared.
                                    </FieldLabel>
                                    <div className="max-w-[200px]">
                                        <Select
                                            value={formData.currencyPosition}
                                            onValueChange={(value) =>
                                                handleChange(
                                                    "currencyPosition",
                                                    value as "BEFORE" | "AFTER"
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="symbol"
                                                className="w-full bg-background border-border text-foreground"
                                            >
                                                <SelectValue placeholder="Select symbol position" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="BEFORE">Before e.g. $100</SelectItem>
                                                <SelectItem value="AFTER">After e.g. 100 Rs</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </Field>

                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="period">
                                        3. Set your default period to be shown in dashboard.
                                    </FieldLabel>
                                    <div className="max-w-[200px]">
                                       <Select
                                            value={formData.defaultPeriod}
                                            onValueChange={(value) =>
                                                handleChange(
                                                    "defaultPeriod",
                                                    value as "WEEKLY" | "MONTHLY" | "YEARLY"
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="period"
                                                className="w-full bg-background border-border text-foreground"
                                            >
                                                <SelectValue placeholder="Select default period" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="WEEKLY">Weekly</SelectItem>
                                                <SelectItem value="MONTHLY">Monthly</SelectItem>
                                                <SelectItem value="YEARLY">Yearly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </Field>

                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="noOfTransactions">
                                        4. Set the number of new transactions to be shown in your dashboard.
                                    </FieldLabel>
                                    <div className="max-w-[200px]">
                                        <Select
                                            value={String(formData.recentTransactionCount)}
                                            onValueChange={(value) =>
                                                handleChange(
                                                    "recentTransactionCount",
                                                    Number(value)
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="noOfTransactions"
                                                className="w-full bg-background border-border text-foreground"
                                            >
                                                <SelectValue placeholder="Select transaction count" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {[5, 10, 15, 20, 25].map((count) => (
                                                    <SelectItem
                                                        key={count}
                                                        value={String(count)}
                                                    >
                                                        {count}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </Field>

                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="theme">
                                        5. Choose how the application looks for you.
                                    </FieldLabel>
                                    <div className="max-w-[200px]">
                                        <Select
                                            value={formData.theme}
                                            onValueChange={(value) =>
                                                handleChange("theme", value as "LIGHT" | "DARK")
                                            }
                                        >
                                            <SelectTrigger
                                                id="theme"
                                                className="w-full min-w-[200px] bg-background border-border text-foreground"
                                            >
                                                <SelectValue placeholder="Select theme" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="LIGHT">Light</SelectItem>
                                                <SelectItem value="DARK">Dark</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </Field>
                            </FieldGroup>
                        </FieldSet>

                        <Field orientation="horizontal">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="bg-t2m-primary cursor-pointer hover:bg-teal-600"
                            >
                                {isSubmitting ? "Saving..." : "Submit"}
                            </Button>

                            <Button
                                variant="outline"
                                type="button"
                                size="lg"
                                disabled={isSubmitting}
                                className="cursor-pointer"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}
