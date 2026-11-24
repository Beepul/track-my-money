"use client"
import getReportActions, { ReportState } from "@/app/dashboard/reports/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReplaceAll, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

type ReportsFormProps = {
    categoryList: {
        id: string, 
        name: string,
        icon: string,
    }[],
    fromDate: string;
    toDate: string;
    category: string;
    type: string;
}

const initialState: ReportState = {
    success: false,
    message: "",
    formData: {
        from_date: "",
        to_date: "",
        category: "all",
        type: "all"
    },
    errors: {}
}

export default function ReportsFormComponent ({categoryList, fromDate, toDate, category, type}: ReportsFormProps) {
    const [state, action, pending] = useActionState(getReportActions, initialState)
    const [selectedCat, setSelectedCat] = useState(category)
    const [selectedType, setSelectedType] = useState(type)
    const [selectedFromDate, setSelectedFromDate] = useState(fromDate);
    const [selectedToDate, setSelectedToDate] = useState(toDate);
    const router = useRouter()

    const resetFilter = () => {
        setSelectedFromDate("");
        setSelectedToDate("");
        setSelectedCat("all");
        setSelectedType("ALL");
        router.replace("/dashboard/reports")
    }

    return (
        <form action={action}>
            <FieldGroup className="flex-row">
                <Field>
                    <FieldLabel htmlFor="from_date">From Date</FieldLabel>
                    <Input id="from_date" name="from_date" type="date" value={selectedFromDate} onChange={(e) => setSelectedFromDate(e.target.value)}/>
                    {
                        state.errors?.from_date && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.from_date[0]}</p>
                        )
                    }
                </Field>
                <Field>
                    <FieldLabel htmlFor="to_date">To Date</FieldLabel>
                    <Input type="date" id="to_date" name="to_date" value={selectedToDate} onChange={(e) => setSelectedToDate(e.target.value)}/>
                    {
                        state.errors?.to_date && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.to_date[0]}</p>
                        )
                    }
                </Field>
                <Field>
                    <FieldLabel>Category</FieldLabel>
                    <input type="hidden" name="category" value={selectedCat} />
                    <Select value={selectedCat} onValueChange={(value: string) => setSelectedCat(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Category"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                <div className="flex items-center gap-2 capitalize">
                                    <ReplaceAll />
                                    <span>All</span>
                                </div>
                            </SelectItem>
                            {categoryList.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    <div className="flex items-center gap-2 capitalize">
                                        <Image
                                            src={`http://localhost:5000/api/v1/uploads/catIcons/${cat.icon}`}
                                            alt={cat.name}
                                            width={24}
                                            height={24}
                                            className="h-5 w-5"
                                        />
                                        <span>{cat.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {
                        state.errors?.category && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.category[0]}</p>
                        )
                    }
                </Field>
                <Field>
                    <FieldLabel>Type</FieldLabel>
                    <input type="hidden" name="type" value={selectedType} />
                    <Select value={selectedType} onValueChange={(value: string) => setSelectedType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Category"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">
                                <p>All</p>
                            </SelectItem>
                            <SelectItem value="INCOME">
                                <p>Income</p>
                            </SelectItem>
                            <SelectItem value="EXPENSE">
                                <p>Expense</p>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {
                        state.errors?.type && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.type[0]}</p>
                        )
                    }
                </Field>
                <div className="pt-7 flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={pending}
                        className="flex-1 bg-t2m-primary text-white dark:text-slate-900 py-5 cursor-pointer hover:bg-t2m-secondary disabled:opacity-50"
                    >
                        <Search size={16} />
                        {pending ? "Generating..." : "Generate Report"}
                    </Button>
                    <Button type="button" className="py-5 cursor-pointer hover:bg-gray-700 transition-all duration-500" onClick={resetFilter}>Reset Filter</Button>
                </div>
            </FieldGroup>
        </form>
    )
}