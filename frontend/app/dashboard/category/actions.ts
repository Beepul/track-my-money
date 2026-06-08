"use server";
import { z } from "zod";
import { addCategoryApi, deleteCategoryApi, updateCategoryApi } from "./api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().min(1, "Select one icon")
});

export type Category = {
  name: string,
  id: string, 
  icon: string
}

export type CategoryFormState = {
  errors?: {
    name?: string[];
    icon?: string[];
    id?: string[];
  };
  data?:{
    name?: string;
    icon?: string;
    id?:string;
  }
  success?: boolean;
  message?: string;
};

export async function createCategory(prevState:CategoryFormState, formData: FormData): Promise<CategoryFormState> {
    const rawData = {
        name: String(formData.get("name") ?? ""),
        icon: String(formData.get("icon") ?? ""),
    };
    
    
    const validatedFields = CategorySchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
        success: false,
        message: "Please fix the errors in the form.",
        errors: validatedFields.error.flatten().fieldErrors,
        data: {
            name: rawData.name,
        },
        };
    }

    const categoryInfo = await addCategoryApi(validatedFields.data)

    if(!categoryInfo.success){
      return {
        errors: {},
        success: false,
        data: {},
        message: categoryInfo.message
      }
    }

    revalidatePath("/dashboard/category");

    return {
        success: true,
        message: "Category created successfully.",
        errors: {},
        data: {}
    }; 
}

export async function deleteCategoryAction(id: string) {
  const res = await deleteCategoryApi(id);

  if (res.success) {
    revalidatePath("/dashboard/category");
  }

  return res;
}


export async function updateCategoryAction(id:string, prevState:CategoryFormState, formData: FormData): Promise<CategoryFormState>{
   const rawData = {
        name: String(formData.get("name") ?? ""),
        icon: String(formData.get("icon") ?? ""),
    };

    const validatedFields = CategorySchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Please fix the errors in the form.",
        errors: validatedFields.error.flatten().fieldErrors,
        data: rawData,
      };
    }
    const res = await updateCategoryApi({id:id, payload: validatedFields.data});
    if (!res.success) {
      return {
        success: false,
        message: res.message,
        errors: {},
        data: rawData,
      };
    }
  revalidatePath("/dashboard/category");
  redirect("/dashboard/category");
}