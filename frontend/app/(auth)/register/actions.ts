'use server';

import { RegisterSchema } from "@/lib/zod.definitions";
import { registerUserApi } from "../api";

export type RegisterFormState = {
  errors?: {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  data?:{
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
  success?: boolean;
  message?: string;
};


export async function registerUser(prevState: RegisterFormState,formData: FormData): Promise<RegisterFormState>{
     const rawData = {
        first_name: String(formData.get("first_name") ?? ""),
        last_name: String(formData.get("last_name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };
    const validatedFields = RegisterSchema.safeParse(rawData)

    if(!validatedFields.success){
        console.log("Validation failed:: ",validatedFields)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
            data: rawData,
            message: "Please fix the errors in the form.",
        };
    }

    console.log('Raw:: ', rawData)
    console.log('Validation Success:: ', validatedFields)

    const registerInfo = await registerUserApi(validatedFields.data)

    if( !registerInfo.success){
      return {
        errors: {},
        success: false,
        data: {},
        message: registerInfo.message
      }
    }

    return {
        success: true,
        message: "Account created successfully.",
        errors: {},
        data: {}
    };  
}