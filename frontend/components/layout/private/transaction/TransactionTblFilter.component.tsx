
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useActionState, useState, useTransition } from "react";
import {
    applyFilterActions,
    resetFilterActions,
} from "@/app/dashboard/transaction/actions";
import { Input } from "@/components/ui/input";
import { Filter, RotateCcw } from "lucide-react";

type TransactionFilterProps = {
    categoryList: {
        id: string;
        name: string;
        icon: string;
    }[];
    filters?: {
        type: "all" | "INCOME" | "EXPENSE";
        categoryId: string;
        fdate: string;
        tdate: string;
    };
};

const initialState = {
    success: false,
    message: "",
};

export default function TransactionTblFilter({
    categoryList,
    filters,
}: TransactionFilterProps) {
    const [state, action, isPending] = useActionState(
        applyFilterActions,
        initialState
    );

    const [transition, startTransition] = useTransition();

    const [type, setType] = useState<"all" | "INCOME" | "EXPENSE">(
        filters?.type || "all"
    );

    const [categoryId, setCategoryId] = useState(
        filters?.categoryId || "all"
    );

    const [date, setDate] = useState({
        fdate: filters?.fdate || "",
        tdate: filters?.tdate || "",
    });

    return (
        <form action={action}>
            <div className="mb-5 rounded-lg border border-border bg-muted/30 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

                    {/* Transaction Type */}
                    <div>
                        <Label className="mb-2 inline-block text-sm text-t2m-text-secondary">
                            Type
                        </Label>

                        <Select
                            value={type}
                            onValueChange={(value) =>
                                setType(value as "all" | "INCOME" | "EXPENSE")
                            }
                        >
                            <SelectTrigger className="py-[22px] bg-background border-border w-full">
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="INCOME">Income</SelectItem>
                                <SelectItem value="EXPENSE">Expense</SelectItem>
                            </SelectContent>
                        </Select>

                        <input type="hidden" name="type" value={type} />
                    </div>

                    {/* Category */}
                    <div>
                        <Label className="mb-2 inline-block text-sm text-t2m-text-secondary">
                            Category
                        </Label>

                        <Select
                            value={categoryId}
                            onValueChange={setCategoryId}
                        >
                            <SelectTrigger className="py-[22px] bg-background border-border w-full">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>

                                {categoryList.map((cat) => (
                                    <SelectItem
                                        key={cat.id}
                                        value={cat.id}
                                        className="capitalize"
                                    >
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <input
                            type="hidden"
                            name="category"
                            value={categoryId}
                        />
                    </div>

                    {/* From Date */}
                    <div>
                        <Label
                            className="mb-2 inline-block text-sm text-t2m-text-secondary"
                            htmlFor="fdate"
                        >
                            From Date
                        </Label>

                        <Input
                            type="date"
                            name="fdate"
                            id="fdate"
                            value={date.fdate}
                            onChange={(e) =>
                                setDate((prev) => ({
                                    ...prev,
                                    fdate: e.target.value,
                                }))
                            }
                            className="h-11 bg-background border-border text-foreground"
                        />
                    </div>

                    {/* To Date */}
                    <div>
                        <Label
                            className="mb-2 inline-block text-sm text-t2m-text-secondary"
                            htmlFor="tdate"
                        >
                            To Date
                        </Label>

                        <Input
                            type="date"
                            name="tdate"
                            id="tdate"
                            value={date.tdate}
                            onChange={(e) =>
                                setDate((prev) => ({
                                    ...prev,
                                    tdate: e.target.value,
                                }))
                            }
                            className="h-11 bg-background border-border text-foreground"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-end gap-2">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="h-11 flex-1 cursor-pointer bg-t2m-primary text-white dark:text-slate-900 hover:bg-t2m-secondary disabled:opacity-50"
                        >
                            <Filter size={15} />
                            {isPending ? "Applying..." : "Apply"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 flex-1 cursor-pointer bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                            disabled={transition}
                            onClick={() => {
                                setType("all");
                                setCategoryId("all");
                                setDate({
                                    fdate: "",
                                    tdate: "",
                                });

                                startTransition(() => {
                                    resetFilterActions();
                                });
                            }}
                        >
                            <RotateCcw size={15} />
                            {transition ? "Clearing..." : "Reset"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
