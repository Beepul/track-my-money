import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/public/google-icon.svg"


export default function RegisterPage () {
    return (
        <div className="shadow-lg p-8  rounded-2xl text-center text-sm min-w-3/5 md:min-w-1/2 lg:min-w-2/3 2xl:min-w-2/5">
            <h4 className="font-bold text-3xl text-t2m-text-primary mb-3">Welcome To T2M</h4>
            <p className="mb-6">Create account and joing T2M to take <br /><span>Control Of Your Finances</span></p>
            <form action="" className="text-start  border-b border-t2m-text-secondary pb-8 mb-8 relative">
                <div className="flex items-center gap-6">
                    <label htmlFor="first_name" className="">
                        <span className="mb-2 inline-block">First Name</span><br />
                        <Input type="text" name="first_name" id="first_name"/>
                    </label>
                    <label htmlFor="last_name" className="">
                        <span className="mb-2 inline-block">Last Name</span><br />
                        <Input type="text" name="last_name" id="last_name"/>
                    </label>
                </div><br />
                <label htmlFor="email" className="">
                    <span className="mb-2 inline-block">Email</span><br />
                    <Input type="email" name="email" id="email"/>
                </label><br />
                <label htmlFor="password">
                    <span className="mb-2 inline-block">Password</span><br />
                    <Input type="password" name="password" id="password"/>
                </label><br />
                <label htmlFor="confirm_password">
                    <span className="mb-2 inline-block">Confirm Password</span><br />
                    <Input type="password" name="confirm_password" id="confirm_password"/>
                </label><br />
                <Button className="w-full bg-t2m-primary cursor-pointer hover:bg-teal-700 duration-300">Submit</Button>
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-white px-2 text-center text-xs md:text-sm">Or continue with</span>
            </form>
            <Button className="mb-8 w-full" size={"lg"}><Image src={GoogleIcon} alt="G" height={16} width={16} /> Sign in with Google</Button>
            <p>Already have an account? <Link href={'/signin'} className="text-t2m-primary">Sign In</Link></p>
        </div>
    )
}