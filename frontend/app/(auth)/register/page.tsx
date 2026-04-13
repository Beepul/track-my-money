'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/public/google-icon.svg"
import { RegisterFormState, registerUser } from "./actions";
import { useActionState } from "react";

const initialState: RegisterFormState = {
  errors: {},
  success: false,
  data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    },
  message: "",
};

export default function RegisterPage () {
    const [state, formAction, pending] = useActionState(registerUser, initialState)
    return (
        <div className="shadow-lg p-8  rounded-2xl text-center text-sm min-w-3/5 md:min-w-1/2 lg:min-w-2/3 2xl:min-w-2/5">
            <h4 className="font-bold text-3xl text-t2m-text-primary mb-3">Welcome To T2M</h4>
            <p className="mb-6">Create account and joing T2M to take <br /><span>Control Of Your Finances</span></p>
            <form action={formAction} className="text-start  border-b border-t2m-text-secondary pb-8 mb-8 relative">
                <div className="flex items-center gap-6">
                    <label htmlFor="first_name" className="">
                        <span className="mb-2 inline-block">First Name</span><br />
                        <Input type="text" name="first_name" id="first_name" defaultValue={state.data?.first_name ?? ""}/>
                        {state.errors?.first_name && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.first_name[0]}</p>
                        )}
                    </label>
                    <label htmlFor="last_name" className="">
                        <span className="mb-2 inline-block">Last Name</span><br />
                        <Input type="text" name="last_name" id="last_name" defaultValue={state.data?.last_name ?? ""}/>
                        {state.errors?.last_name && (
                            <p className="text-red-500 text-xs mt-1">{state.errors.last_name[0]}</p>
                        )}
                    </label>
                </div><br />
                <label htmlFor="email" className="">
                    <span className="mb-2 inline-block">Email</span><br />
                    <Input type="email" name="email" id="email" defaultValue={state.data?.email ?? ""}/>
                    {state.errors?.email && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                    )}
                </label><br />
                <label htmlFor="password">
                    <span className="mb-2 inline-block">Password</span><br />
                    <Input type="password" name="password" id="password" defaultValue={state.data?.password ?? ""}/>
                    {state.errors?.password && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
                    )}
                </label><br />
                <label htmlFor="confirmPassword">
                    <span className="mb-2 inline-block">Confirm Password</span><br />
                    <Input type="password" name="confirmPassword" id="confirmPassword" defaultValue={state.data?.confirmPassword ?? ""}/>
                    {state.errors?.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{state.errors.confirmPassword[0]}</p>
                    )}
                </label><br />
                {(!state.success && state.message) && (
                    <div className="bg-red-100 p-2 rounded-md mb-4">
                        <p className="text-red-500 text-xs mt-1 text-center">{state.message}</p>
                    </div>
                )}
                <Button className="w-full bg-t2m-primary cursor-pointer hover:bg-teal-700 duration-300">Submit</Button>
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-white px-2 text-center text-xs md:text-sm">Or continue with</span>
            </form>
            <Button className="mb-8 w-full cursor-pointer" size={"lg"}><Image src={GoogleIcon} alt="G" height={16} width={16} /> Sign in with Google</Button>
            <p>Already have an account? <Link href={'/signin'} className="text-t2m-primary">Sign In</Link></p>
        </div>
    )
}