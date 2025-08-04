import HeaderComponent from "@/components/layout/public/Header.component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import Link from "next/link";
import GoogleIcon from "@/public/google-icon.svg"
import Image from "next/image";

export default function SignInPage () {
    return (
        <div className="shadow-lg p-8 rounded-2xl text-center text-sm min-w-3/5 md:min-w-1/2 lg:min-w-2/3 2xl:min-w-2/5">
            <h4 className="font-bold text-3xl text-t2m-text-primary mb-3">Welcome Back</h4>
            <p className="mb-6">Sign in to your account to continue</p>
            <form action="" className="text-start  border-b border-t2m-text-secondary pb-8 mb-8 relative">
                <label htmlFor="email" className="">
                    <span className="mb-2 inline-block">Email Address</span><br />
                    <Input type="email" name="email" id="email"/>
                </label><br />
                <label htmlFor="password">
                    <span className="mb-2 inline-block">Password</span><br />
                    <Input type="password" name="password" id="password"/>
                </label>
                <div className="text-xs md:text-sm flex items-center justify-between mt-6 mb-6 gap-6">
                    <label htmlFor="rememberme">
                        <input type="checkbox" name="rememberme" className="h-3 w-3 mr-1 text-left" />
                        Remember me
                    </label>
                    <Link href={'/'} className="text-right text-t2m-primary cursor-pointer ">Forgot password?</Link>
                </div>
                <Button className="w-full bg-t2m-primary cursor-pointer hover:bg-teal-700 duration-300">Sign In</Button>
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-white px-2 text-center text-xs md:text-sm">Or continue with</span>
            </form>
            <Button className="mb-8 w-full" size={"lg"}><Image src={GoogleIcon} alt="G" height={16} width={16} /> Sign in with Google</Button>
            <p>Don't have an account? <Link href={'/register'} className="text-t2m-primary">Sign up</Link></p>
        </div>
    )
}