"use server"

import { cookies } from "next/headers";
import { SignInSchema } from "@/lib/zod.definitions";
import { signInUserApi } from "../api";

export type SignInFormState = {
    success?: boolean;
    message?: string;
    data?:{
        email?: string;
        password?: string;
    };
    errors?: {
        email?: string[];
        password?: string[];
    };
}
export async function signIn(_prevState: SignInFormState, form: FormData): Promise<SignInFormState> {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  const validatedFields = SignInSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
        success: false,
        message: "Please fix the errors in the form.",
        data: {
            email,
            password
        },
        errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userData = await signInUserApi({email,password}) 

  if(!userData.success){
    return {
        success: false,
        message: userData.message,
        data: {},
        errors: {}
    }
  }

  console.log("Hurry", userData)

  if (!userData.data?.accessToken) {
    return {
            success: false,
            message: "Access token was not returned.",
            data: {
            email,
            },
            errors: {},
        };
    }
  const cookieStore = await cookies()

  cookieStore.set('T2M_LOGIN', userData.data?.accessToken, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 4,
    path: '/'
  })

  return { 
    success: true,
    message: "User Signin Successfully",
    errors: {},
    data: {}
   };
}