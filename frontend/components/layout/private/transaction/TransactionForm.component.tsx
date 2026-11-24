
"use client";

import {
    addTransaction,
    AddTransactionFormState,
    Transaction,
    updateTransaction,
} from "@/app/dashboard/transaction/actions";
import DatePickerInput from "@/components/layout/public/DatePickerInput.component";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldContent,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const initialState: AddTransactionFormState = {
    success: false,
    message: "",
    data: {
        title: "",
        amount: 0,
        note: "",
        type: "INCOME",
        date: new Date().toISOString().split("T")[0],
        categoryId: "",
    },
    errors: {},
};

type TransactionFormProps = {
    categoryList: {
        id: string;
        name: string;
        icon: string;
    }[];
    mode: "create" | "edit";
    transaction?: Transaction;
};

export default function TransactionForm({
    categoryList,
    mode,
    transaction,
}: TransactionFormProps) {
    const [imageError, setImageError] = useState("");

    const selectedAction =
        mode === "edit" && transaction?.id
            ? updateTransaction.bind(null, transaction.id)
            : addTransaction;

    const [state, action, pending] = useActionState(
        selectedAction,
        initialState
    );

    const [selectedCategory, setSelectedCategory] = useState(
        transaction?.categoryId || state.data?.categoryId || ""
    );

    const initialType =
        mode === "edit"
            ? transaction?.type || "INCOME"
            : state.data?.type || "INCOME";

    const router = useRouter();

    useEffect(() => {
        if (!state.success || !state.message) return;

        toast.success(state.message);

        if (mode === "edit" && transaction?.id) {
            router.push(`/dashboard/transaction/${transaction.id}`);
        } else {
            router.push("/dashboard/transaction");
        }
    }, [state, mode, transaction?.id, router]);

    return (
        <form action={action}>
            <div>
                <FieldGroup className="w-full">
                    {/* Transaction Type */}
                    <FieldSet>
                        <FieldLegend
                            variant="label"
                            className="!text-[16px] !text-t2m-text-secondary font-normal"
                        >
                            Transaction Type
                        </FieldLegend>

                        <RadioGroup
                            defaultValue={initialType}
                            name="type"
                            id="type"
                            className="flex"
                        >
                            <FieldLabel
                                htmlFor="income"
                                className="
                                    cursor-pointer
                                    bg-background border-border text-foreground
                                    hover:bg-accent
                                    has-[[data-state=checked]]:!bg-t2m-secondary
                                    has-[[data-state=checked]]:!border-t2m-secondary
                                    has-[[data-state=checked]]:!text-white
                                    dark:has-[[data-state=checked]]:!text-slate-900
                                    transition-colors
                                "
                            >
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle className="flex items-center gap-2">
                                            <ArrowUp size={16} />
                                            Income
                                        </FieldTitle>
                                    </FieldContent>

                                    <RadioGroupItem
                                        value="INCOME"
                                        id="income"
                                        className="data-[state=checked]:!text-white dark:data-[state=checked]:!text-slate-900"
                                    />
                                </Field>
                            </FieldLabel>

                            <FieldLabel
                                htmlFor="expense"
                                className="
                                    cursor-pointer
                                    bg-background border-border text-foreground
                                    hover:bg-accent
                                    has-[[data-state=checked]]:!bg-red-400
                                    has-[[data-state=checked]]:!border-red-400
                                    has-[[data-state=checked]]:!text-white
                                    transition-colors
                                "
                            >
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle className="flex items-center gap-2">
                                            <ArrowDown size={16} />
                                            Expense
                                        </FieldTitle>
                                    </FieldContent>

                                    <RadioGroupItem
                                        value="EXPENSE"
                                        id="expense"
                                        className="data-[state=checked]:!text-white"
                                    />
                                </Field>
                            </FieldLabel>
                        </RadioGroup>
                    </FieldSet>

                    {/* Title */}
                    <Field>
                        <FieldLabel
                            htmlFor="title"
                            className="!text-[16px] !text-t2m-text-secondary font-normal"
                        >
                            Title
                        </FieldLabel>

                        <Input
                            name="title"
                            id="title"
                            placeholder="Enter transaction title"
                            required
                            className="py-6 bg-background border-border text-foreground placeholder:text-muted-foreground"
                            defaultValue={
                                state.data?.title ||
                                transaction?.title ||
                                ""
                            }
                        />

                        {state.errors?.title && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {state.errors.title[0]}
                            </p>
                        )}
                    </Field>

                    {/* Amount */}
                    <Field>
                        <FieldLabel
                            htmlFor="amount"
                            className="!text-[16px] !text-t2m-text-secondary font-normal"
                        >
                            Amount
                        </FieldLabel>

                        <InputGroup className="py-6 bg-background border-border text-foreground">
                            <InputGroupInput
                                name="amount"
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                defaultValue={
                                    state.data?.amount ||
                                    transaction?.amount ||
                                    0
                                }
                            />

                            <InputGroupAddon className="text-muted-foreground">
                                $
                            </InputGroupAddon>
                        </InputGroup>

                        {state.errors?.amount && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {state.errors.amount[0]}
                            </p>
                        )}
                    </Field>

                    {/* Date */}
                    <DatePickerInput
                        label="Date"
                        id="date"
                        name="date"
                        defaultDate={transaction?.date}
                    />

                    {state.errors?.date && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                            {state.errors.date[0]}
                        </p>
                    )}

                    {/* Category */}
                    <Field>
                        <FieldLabel
                            htmlFor="categoryId"
                            className="text-t2m-text-secondary"
                        >
                            Category
                        </FieldLabel>

                        <input
                            type="hidden"
                            name="categoryId"
                            value={selectedCategory}
                        />

                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger
                                id="categoryId"
                                className="w-full py-6 bg-background border-border text-foreground"
                            >
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>

                            <SelectContent>
                                {categoryList.map((cat) => (
                                    <SelectItem
                                        key={cat.id}
                                        value={cat.id}
                                    >
                                        <div className="flex items-center gap-2 capitalize">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-white border border-1 dark:border-gray-300">
                                                <Image
                                                    src={`http://localhost:5000/api/v1/uploads/catIcons/${cat.icon}`}
                                                    alt={cat.name}
                                                    width={24}
                                                    height={24}
                                                    unoptimized
                                                    className="h-6 w-6 object-contain"
                                                />
                                            </div>

                                            <span>{cat.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {state.errors?.categoryId && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {state.errors.categoryId[0]}
                            </p>
                        )}
                    </Field>

                    {/* Note */}
                    <Field>
                        <FieldLabel
                            htmlFor="note"
                            className="text-t2m-text-secondary"
                        >
                            Leave a note (Optional)
                        </FieldLabel>

                        <Textarea
                            id="note"
                            name="note"
                            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                            defaultValue={
                                state.data?.note ||
                                transaction?.note ||
                                ""
                            }
                        />

                        {state.errors?.note && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {state.errors.note[0]}
                            </p>
                        )}
                    </Field>

                    {/* Image */}
                    <Field>
                        <FieldLabel
                            htmlFor="image"
                            className="text-t2m-text-secondary"
                        >
                            Image (Optional)
                        </FieldLabel>

                        <Input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="bg-background border-border text-foreground file:text-foreground"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file && file.size > 1024 * 1024) {
                                    setImageError(
                                        "Image must be less than 1MB"
                                    );
                                    e.target.value = "";
                                    return;
                                }

                                setImageError("");
                            }}
                        />

                        {imageError && (
                            <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                                {imageError}
                            </p>
                        )}
                    </Field>
                </FieldGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-5 pt-6">
                <Button
                    asChild
                    variant="outline"
                    className="
                        flex-1 py-5 px-6 cursor-pointer
                        bg-background border-border text-foreground
                        hover:bg-accent hover:text-accent-foreground
                    "
                >
                    <Link href="/dashboard/transaction">
                        Cancel
                    </Link>
                </Button>

                <Button
                    type="submit"
                    disabled={pending}
                    className="
                        flex-1 py-5 px-6 cursor-pointer
                        bg-t2m-primary text-white
                        dark:text-slate-900
                        hover:bg-t2m-secondary
                        disabled:opacity-50
                    "
                >
                    <Save size={16} />
                    {pending
                        ? "Saving..."
                        : mode === "edit"
                        ? "Update Transaction"
                        : "Save Transaction"}
                </Button>
            </div>
        </form>
    );
}
