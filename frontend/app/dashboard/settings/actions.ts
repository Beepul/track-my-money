"use server"
import { UpdateAccountSchema, UpdatePasswordSchema } from "@/lib/zod.definitions";
import { ChangeAccountInfo, UpdatePassword } from "./api";
import { revalidatePath } from "next/cache";

export type UpdateAccountState = {
  success: boolean;
  message: string;
  formData: {
    first_name: string;
    last_name: string;
  };
  errors: {
    first_name?: string[];
    last_name?: string[];
  };
};
export async function UpdateAccountActions(prevState: UpdateAccountState, formData: FormData): Promise<UpdateAccountState> {

  const rawData = {
    first_name: String(formData.get("first_name") ?? ""),
    last_name: String(formData.get("last_name") ?? "")
  }

  console.log(rawData)
  

  const validateFields = UpdateAccountSchema.safeParse(rawData)

  if(!validateFields.success){
    return {
      errors: validateFields.error.flatten().fieldErrors,
      success: false,
      formData: rawData,
      message: "Please fix the errors in the form."
    }
  }

  const res = await ChangeAccountInfo(rawData)

  revalidatePath('/dashboard')
  return {
      errors: {},
      success: true,
      formData: res.data,
      message: res.message
    }
}

export type UpdatePasswordState = {
  success: boolean;
  message: string;
  formData?: {
      currentPassword: string,
      newPassword: string,
      confirmPassword: string,
  }
  errors?: {
      currentPassword?: string[],
      newPassword?: string[],
      confirmPassword?: string[],
  };
}
export async function UpdatePasswordAction(prevState: UpdatePasswordState, formData: FormData): Promise<UpdatePasswordState>{
    const raw = {
      currentPassword: formData.get("currentPassword") as string,
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    }
    
    const parsed = UpdatePasswordSchema.safeParse(raw)
    
    if (!parsed.success) {
      return {
        errors: parsed.error.flatten().fieldErrors,
        success: false,
        formData: raw,
        message: "Please fix the errors in the form."
      }
    }
    const res = await UpdatePassword(raw)
    return {
      errors: {},
      success: res.success,
      message: res.message
    }
}