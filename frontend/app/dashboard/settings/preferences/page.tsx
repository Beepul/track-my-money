import ThemeToggler from "@/components/layout/private/ui/ThemeToggler.component";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Moon, Sun } from "lucide-react";

export default function SettingPreferences(){
    return (
        <div className="">
            <div className="bg-white p-12 rounded-md max-w-[850px] m-auto shadow-lg">
                <form action="">
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend className="!text-xl !font-semibold">Preferences</FieldLegend>
                            <FieldDescription className="mb-4">
                                Customize how things appear on your Track My Money
                            </FieldDescription>
                            <FieldGroup>
                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="currency">
                                        1. Customize how amounts and currency are displayed.
                                    </FieldLabel>
                                    <div className="max-w-[200px]"> 
                                        <NativeSelect value={"aus"} id="currency">
                                            <NativeSelectOption value="aus">Australian Dollar ($)</NativeSelectOption>
                                            <NativeSelectOption value="us">American Dollar ($)</NativeSelectOption>
                                            <NativeSelectOption value="rupee">Nepali Rupee (rs)</NativeSelectOption>
                                            <NativeSelectOption value="pound">British Pound (£)</NativeSelectOption>
                                        </NativeSelect>
                                    </div>
                                </Field>
                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="symbol">
                                        2. Customize how currency symbol to be appeared.
                                    </FieldLabel>
                                    <div className="max-w-[200px]"> 
                                        <NativeSelect value={"before"} id="symbol">
                                            <NativeSelectOption value="before">Before eg. $100</NativeSelectOption>
                                            <NativeSelectOption value="after">After eg. 100rs</NativeSelectOption>
                                        </NativeSelect>
                                    </div>
                                </Field>
                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="period">
                                        3. Set your default period to be shown in dashboard.
                                    </FieldLabel>
                                    <div className="max-w-[200px]"> 
                                        <NativeSelect value={"monthly"} id="period">
                                            <NativeSelectOption value="daily">Daily</NativeSelectOption>
                                            <NativeSelectOption value="monthly">Monthly</NativeSelectOption>
                                            <NativeSelectOption value="yearly">Yearly</NativeSelectOption>
                                        </NativeSelect>
                                    </div>
                                </Field>
                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="noOfTransactions">
                                        4. Set the number of new transactions to be shown in your dashboard.
                                    </FieldLabel>
                                    <div className="max-w-[200px]"> 
                                        <NativeSelect value={"5"} id="noOfTransactions">
                                            <NativeSelectOption value="5">5</NativeSelectOption>
                                            <NativeSelectOption value="10">10</NativeSelectOption>
                                            <NativeSelectOption value="15">15</NativeSelectOption>
                                            <NativeSelectOption value="20">20</NativeSelectOption>
                                            <NativeSelectOption value="25">25</NativeSelectOption>
                                        </NativeSelect>
                                    </div>
                                </Field>
                                <Field className="flex items-center flex-row justify-between">
                                    <FieldLabel htmlFor="noOfTransactions">
                                        5. Choose how the application looks for you.
                                    </FieldLabel>
                                    <div className="max-w-[200px]">
                                        <ThemeToggler />
                                    </div>
                                </Field>
                                
                            </FieldGroup>
                        </FieldSet>
                        <Field orientation="horizontal" className="">
                            <Button type="submit" size={"lg"} className="bg-t2m-primary cursor-pointer hover:bg-teal-600">Submit</Button>
                            <Button variant="outline" type="button" size={"lg"} className="cursor-pointer">
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}