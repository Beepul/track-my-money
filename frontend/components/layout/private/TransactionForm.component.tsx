"use client"
import { getAllCategoryApi } from "@/app/dashboard/category/api";
import { addTransaction, AddTransactionFormState,  } from "@/app/dashboard/transaction/actions";
import DatePickerInput from "@/components/layout/public/DatePickerInput.component";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, Save } from "lucide-react";
import Image from "next/image";
import { useActionState, useState } from "react";


const initialState:AddTransactionFormState = {
    success: false,
    message: "",
    data: {
        title: "",
        amount: 0,
        note: "",
        type: "INCOME",
        date: new Date().toISOString().split("T")[0],
        categoryId: "",
        image: null
    },
    errors: {}
}

type TransactionFormProps = {
    categoryList: {
        id: string, 
        name: string,
        icon: string,
    }[]
}


export default function TransactionForm({categoryList}: TransactionFormProps) {
    const [state, action, pending] = useActionState(addTransaction, initialState);
    const [selectedCategory, setSelectedCategory] = useState(state.data?.categoryId ?? "")
    
    
    return (
        <form action={action}>
            <div>
                <FieldGroup className="w-full">
                    <FieldSet>
                        <FieldLegend variant="label" className="!text-[16px] !text-t2m-text-secondary font-normal">Transaction Type</FieldLegend>
                        <RadioGroup defaultValue="INCOME" name="type" id="type" className="flex">
                            <FieldLabel htmlFor="income" className="has-[[data-state=checked]]:!bg-t2m-secondary has-[[data-state=checked]]:!border-t2m-secondary has-[[data-state=checked]]:!text-white cursor-pointer">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>
                                            <ArrowUp size={16} />
                                            Income
                                        </FieldTitle>
                                    </FieldContent>
                                    <RadioGroupItem value="INCOME" id="income" className="data-[state=checked]:!text-white" />
                                </Field>
                            </FieldLabel>
                            <FieldLabel htmlFor="expense" className="has-[[data-state=checked]]:!bg-red-400 has-[[data-state=checked]]:!border-red-400 has-[[data-state=checked]]:!text-white cursor-pointer">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>
                                            <ArrowDown size={16} />
                                            Expense
                                        </FieldTitle>
                                    </FieldContent>
                                    <RadioGroupItem value="EXPENSE" id="expense" className="data-[state=checked]:!text-white" />
                                </Field>
                            </FieldLabel>
                        </RadioGroup>
                    </FieldSet>
                    <Field>
                        <FieldLabel htmlFor="title" className="!text-[16px] !text-t2m-text-secondary font-normal">Title</FieldLabel>
                        <Input name="title" id="title" placeholder="Enter transaction title" required className="py-6" defaultValue={state.data?.title || ""} />
                        {state.errors?.title && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.title[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="amount" className="!text-[16px] !text-t2m-text-secondary font-normal">Amount</FieldLabel>
                        <InputGroup className="py-6">
                            <InputGroupInput name="amount" placeholder="0.00" id="amount" defaultValue={state.data?.amount || 0}/>
                            <InputGroupAddon>
                                $
                            </InputGroupAddon>
                        </InputGroup>
                        {state.errors?.amount && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.amount[0]}</p>
                        )}
                    </Field>
                    <DatePickerInput />
                    {state.errors?.date && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.date[0]}</p>
                    )}
                    <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <input type="hidden" name="categoryId" value={selectedCategory} />

                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger id="categoryId" className="w-full py-6">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>

                            <SelectContent>
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
                        {state.errors?.categoryId && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.categoryId[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="note">Leave a note (Optional)</FieldLabel>
                        <Textarea id="note" name="note" defaultValue={state.data?.note || ""}/>
                        {state.errors?.note && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.note[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="image">Image (Optional)</FieldLabel>
                        <Input type="file" id="image" name="image"/>
                    </Field>
                </FieldGroup>
            </div>
            <div className="flex items-center justify-center gap-5 pt-6">
                <Button type="button" className="bg-white text-t2m-text-secondary border py-5 px-6 flex-1 cursor-pointer hover:bg-white hover:text-t2m-text-secondary hover:opacity-75">Cancle</Button>
                <Button type="submit" className="flex-1 bg-t2m-primary py-5 px-6 cursor-pointer hover:bg-t2m-primary hover:opacity-75 disabled:bg-teal-500" disabled={pending}><Save size={16} /> Save Transaction</Button>
            </div>
        </form>
    )
}