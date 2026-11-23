"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { UpdatePasswordAction } from "../actions";
import { useActionState, useState } from "react";

export default function SettingSecurity(){
    const [state, formAction, isPending] = useActionState(UpdatePasswordAction, {
        success: false,
        message: ""
    })
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    })
    return (
        <div className="">
            <div className="bg-white p-12 rounded-md max-w-[850px] m-auto shadow-lg">
                <form action={formAction}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend className="!text-xl !font-semibold">Security</FieldLegend>
                            <FieldDescription className="mb-4">
                                Change your password and keep your account secure.
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="currentPassword">
                                        Current Password
                                    </FieldLabel>
                                    <div className="flex items-center border-[0.5] rounded-lg border-gray-300 transition-all focus-within:border-t2m-primary focus-within:ring-2 focus-within:ring-t2m-primary/20">
                                        <Input name="currentPassword" type={showPassword.currentPassword ? "text" : "password"} id="currentPassword" placeholder="Enter your current password" required className="h-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                                        <Button 
                                            size={"icon"} 
                                            className="bg-transparent hover:bg-transparent cursor-pointer"
                                            type="button"
                                            onClick={()=>{
                                                setShowPassword(prev => ({
                                                    ...prev, currentPassword: !prev.currentPassword
                                                }))
                                            }}
                                            >
                                                {
                                                    !showPassword.currentPassword ? <EyeClosed className="text-t2m-text-primary"/> : <Eye className="text-t2m-text-primary" />
                                                }
                                                
                                            </Button>
                                    </div>
                                    {
                                        state.errors?.currentPassword && (
                                            <p className="text-red-500 text-xs mt-1">{state.errors.currentPassword[0]}</p>
                                        )
                                    }
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="newPassword">
                                        New Password
                                    </FieldLabel>
                                    <div className="flex items-center border-[0.5] rounded-lg border-gray-300 transition-all focus-within:border-t2m-primary focus-within:ring-2 focus-within:ring-t2m-primary/20">
                                        <Input name="newPassword" type={showPassword.newPassword ? "text" : "password"} id="newPassword" placeholder="Enter your new password" required className="h-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                                        <Button 
                                            size={"icon"} 
                                            className="bg-transparent hover:bg-transparent cursor-pointer"
                                            type="button"
                                            onClick={()=>{
                                                setShowPassword(prev => ({
                                                    ...prev, newPassword: !prev.newPassword
                                                }))
                                            }}
                                            >
                                                {
                                                    !showPassword.newPassword ? <EyeClosed className="text-t2m-text-primary"/> : <Eye className="text-t2m-text-primary" />
                                                }
                                            </Button>
                                    </div>
                                    {
                                        state.errors?.newPassword && (
                                            <p className="text-red-500 text-xs mt-1">{state.errors.newPassword[0]}</p>
                                        )
                                    }
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm New Password
                                    </FieldLabel>
                                    <div className="flex items-center border-[0.5] rounded-lg border-gray-300 transition-all focus-within:border-t2m-primary focus-within:ring-2 focus-within:ring-t2m-primary/20">
                                        <Input name="confirmPassword" type={showPassword.confirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Enter your current password" required className="h-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                                        <Button 
                                        size={"icon"} 
                                        className="bg-transparent hover:bg-transparent cursor-pointer"
                                        type="button"
                                            onClick={()=>{
                                                setShowPassword(prev => ({
                                                    ...prev, confirmPassword: !prev.confirmPassword
                                                }))
                                            }}
                                        >
                                            {
                                                !showPassword.confirmPassword ? <EyeClosed className="text-t2m-text-primary"/> : <Eye className="text-t2m-text-primary" />
                                            }
                                        </Button>
                                    </div>
                                    {
                                        state.errors?.confirmPassword && (
                                            <p className="text-red-500 text-xs mt-1">{state.errors.confirmPassword[0]}</p>
                                        )
                                    }
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        {
                            !state.success && (
                                <p className="text-red-500 text-xs mt-1">{state.message}</p>
                            )
                        }
                        <Field orientation="horizontal" className="justify-end">
                            <Button type="submit" size={"lg"} disabled={isPending} className="bg-t2m-primary cursor-pointer hover:bg-teal-600">
                                {isPending ? "submitting..." : "Submit"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </div>
    )
}