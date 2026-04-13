import DatePickerInput from "@/components/layout/public/DatePickerInput.component";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, MoveDown, MoveUp, Save } from "lucide-react";

export default function AddTransactionPage ( ) {
    return (
        <main className="flex">
            <div className="bg-white m-auto p-8 shadow-sm rounded-lg min-w-[650px]"> 
                <h2 className="text-xl font-medium text-t2m-text-primary">Create New Transaction</h2>
                <p className="mb-5">Add your income or expense details below</p>
                <form action="">
                    <div>
                        <FieldGroup className="w-full">
                            <FieldSet>
                                <FieldLegend variant="label" className="!text-[16px] !text-t2m-text-secondary font-normal">Transaction Type</FieldLegend>
                                <RadioGroup defaultValue="income" className="flex">
                                    <FieldLabel htmlFor="income" className="has-[[data-state=checked]]:!bg-t2m-secondary has-[[data-state=checked]]:!border-t2m-secondary has-[[data-state=checked]]:!text-white cursor-pointer">
                                        <Field orientation="horizontal">
                                            <FieldContent>
                                                <FieldTitle>
                                                    <ArrowUp size={16} />
                                                    Income
                                                </FieldTitle>
                                            </FieldContent>
                                            <RadioGroupItem value="income" id="income" className="data-[state=checked]:!text-white"/>
                                        </Field>
                                    </FieldLabel>
                                    <FieldLabel htmlFor="expense" className="has-[[data-state=checked]]:!bg-red-400 has-[[data-state=checked]]:!border-red-400 has-[[data-state=checked]]:!text-white cursor-pointer">
                                        <Field orientation="horizontal">
                                            <FieldContent>
                                                <FieldTitle>
                                                    <ArrowDown size={16}/>    
                                                    Expense
                                                </FieldTitle>
                                            </FieldContent>
                                            <RadioGroupItem value="expense" id="expense" className="data-[state=checked]:!text-white"/>
                                        </Field>
                                    </FieldLabel>
                                </RadioGroup>
                            </FieldSet>
                            <Field>
                                <FieldLabel htmlFor="title" className="!text-[16px] !text-t2m-text-secondary font-normal">Title</FieldLabel>
                                <Input id="title" placeholder="Enter transaction title" required className="py-6"/>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="amount" className="!text-[16px] !text-t2m-text-secondary font-normal">Amount</FieldLabel>
                                    <InputGroup className="py-6">
                                        <InputGroupInput placeholder="0.00" id="amount"/>
                                        <InputGroupAddon>
                                            $
                                        </InputGroupAddon>
                                    </InputGroup>
                            </Field>
                            <DatePickerInput />
                            <Field>
                                <FieldLabel htmlFor="category">Category</FieldLabel>
                                <NativeSelect id="category" className="py-3 h-auto">
                                    <NativeSelectOption value="">Select a category</NativeSelectOption>
                                    <NativeSelectOption value="weekly">Weekly</NativeSelectOption>
                                    <NativeSelectOption value="monthly">Monthly</NativeSelectOption>
                                    <NativeSelectOption value="yearly">Yearly</NativeSelectOption>
                                </NativeSelect>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="note">Leave a note (Optional)</FieldLabel>
                                <Textarea />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="">Receipt (Optional)</FieldLabel>
                                <Input type="file"/>
                            </Field>
                        </FieldGroup>
                    </div>
                    <div className="flex items-center justify-center gap-5 pt-6">
                        <Button className="bg-white text-t2m-text-secondary border py-5 px-6 flex-1 cursor-pointer hover:bg-white hover:text-t2m-text-secondary hover:opacity-75">Cancle</Button>
                        <Button className="flex-1 bg-t2m-primary py-5 px-6 cursor-pointer hover:bg-t2m-primary hover:opacity-75"><Save size={16}/> Save Transaction</Button>
                    </div>

                </form>
            </div>
        </main>
    )
}


