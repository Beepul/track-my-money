"use client"
import { User } from "@/app/dashboard/api";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Image from "next/image";
import profile from "@/public/images/profile-1.jpg"
import { useActionState } from "react";
import { UpdateAccountActions, UpdateAccountState } from "@/app/dashboard/settings/actions";


const initialState: UpdateAccountState = {
    success: false,
    message: "",
    formData: {
        first_name: "",
        last_name: ""
    },
    errors: {}
}

export default function AccountSettingForm({user}: {user: User}) {
    const [state, action, isPending] = useActionState(UpdateAccountActions, initialState)
    const getProfilePlaceholder = () => {
        const firstCharacter = user.first_name.split("")[0]
        const secondCharacter = user.last_name.split("")[0]
        return `${firstCharacter}${secondCharacter}`
    }
    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }
    return (
        <div className="bg-white p-12 rounded-md max-w-[850px] m-auto shadow-lg">
            <form action={action}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend className="!text-xl !font-semibold">Account Information</FieldLegend>
                        <FieldDescription className="mb-8">
                            Update your personal informaiton and profile
                        </FieldDescription>
                        <FieldGroup className="flex items-center gap-6">
                            <div className="mb-8 flex flex-col items-center justify-between gap-4">
                                {user.image ? (
                                    <Image src={profile} alt="profile" className="rounded-full object-cover h-[30px] w-[30px]" />
                                ) : (
                                    <span className="uppercase flex items-center justify-center font-semibold rounded-full bg-amber-800 text-white h-[100px] w-[100px]" >{getProfilePlaceholder()}</span>
                                )}
                                <Button variant={"outline"} size={"lg"} className="cursor-pointer"><Camera /> Change Photo</Button>
                                <Input type="image" hidden/>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="grid grid-cols-2 gap-8">
                                    <Field>
                                        <FieldLabel htmlFor="firstName">
                                            First Name
                                        </FieldLabel>
                                        <Input id="firstName" name="first_name" placeholder="Enter your name" defaultValue={state.formData.first_name || user.first_name} required className="h-10"/>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="lastName">
                                            Last Name
                                        </FieldLabel>
                                        <Input id="lastName" name="last_name" placeholder="Enter your last name" defaultValue={state.formData.last_name || user.last_name} required className="h-10"/>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input id="email" type="email" placeholder="Enter your email" value={user.email} required readOnly className="h-10 text-gray-500 focus-visible:ring-0 focus-visible:border-gray-200"/>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="joinedAt">
                                            Member Since
                                        </FieldLabel>
                                        <Input id="joinedAt" placeholder="enter your date" value={formatDate(user.createdAt)} required readOnly className="h-10  text-gray-500 focus-visible:ring-0 focus-visible:border-gray-200"/>
                                    </Field>
                                </div>
                            </div>
                        </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal" className="justify-end">
                        <Button type="submit" size={"lg"} disabled={isPending} className="bg-t2m-primary cursor-pointer hover:bg-teal-600 disabled:bg-teal-400">Submit</Button>
                        {/* <Button variant="outline" type="button" size={"lg"} className="cursor-pointer">
                            Cancel
                        </Button> */}
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}