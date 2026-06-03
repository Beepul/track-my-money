"use client"
import { createCategory, updateCategoryAction } from "@/app/dashboard/category/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tags } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";


const initialState = {
    success: false,
    message: "",
    data: {
        name: "",
        icon: ""
    },
    errors: {}
}

type CategoryFormProps = {
    categoryIcons: string[];
    mode?: 'create' | 'edit';
    catDetails?: {
        name: string,
        icon: string,
        id: string
    }
}



export default function CategoryForm({categoryIcons, mode, catDetails}: CategoryFormProps) {
    const selectedAction = mode === "edit" && catDetails?.id
        ? updateCategoryAction.bind(null, catDetails.id)
        : createCategory;
    const [state, action, pending] = useActionState(selectedAction , initialState)
    const [selectedIcon, setSelectedIcon] = useState(catDetails?.icon ?? "");

    const router = useRouter()

    
    useEffect(() => {
        if (state.success) {
            setSelectedIcon("");
        }
    }, [state.success]);

    return (
        <form action={action}>
            <div>
                <FieldGroup className="w-full mb-6">
                    <Field>
                        <FieldLabel htmlFor="title" className="!text-[16px] !text-t2m-text-secondary font-normal">Name</FieldLabel>
                        <Input name="name" id="title" placeholder="Enter category name" required className="py-6" defaultValue={state.data?.name || catDetails?.name || ""}/>
                        {state.errors?.name && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="icon">Icon</FieldLabel>

                        <input type="hidden" name="icon" id="icon" value={selectedIcon} />

                        <div className="grid grid-cols-6 gap-3 mt-2">
                            {categoryIcons.map((icon) => {
                            const isSelected = selectedIcon === icon;

                            return (
                                <button
                                    type="button"
                                    key={icon}
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`border rounded-md p-3 flex items-center flex-col justify-center cursor-pointer ${
                                        isSelected
                                        ? "border-t2m-primary bg-t2m-bg-primary"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    <img
                                        src={`http://localhost:5000/api/v1/uploads/catIcons/${icon}`}
                                        alt={icon}
                                        className="h-6 w-6"
                                    />
                                    <span className="text-[11px] text-gray-500 text-center ">
                                        {icon.replace(".svg", "")}
                                    </span>
                                </button>
                            );
                            })}
                        </div>

                        {state.errors?.icon && (
                            <p className="text-sm text-red-500">{state.errors.icon[0]}</p>
                        )}
                    </Field>
                </FieldGroup>
                {!state.success && state.message && (
                    <p className={state.success ? "text-sm text-green-600" : "text-sm text-red-500"}>
                        {state.message}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-center gap-5 pt-6">
                <Button type="button" className="bg-white text-t2m-text-secondary border py-5 px-6 flex-1 cursor-pointer hover:bg-white hover:text-t2m-text-secondary hover:opacity-75" onClick={()=> router.push('/dashboard/category')}>Back</Button>
                <Button type="submit" className="flex-1 bg-t2m-primary py-5 px-6 cursor-pointer hover:bg-t2m-primary hover:opacity-75 disabled:bg-teal-600" disabled={pending}><Tags size={16} /> 
                    {mode === "create" ? "Create Category" : "Save Category"}
                </Button>
            </div>
        </form>
    )
}