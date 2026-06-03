import { API_BASE_URL } from "@/config/api.config";
import { apiFetch } from "@/lib/apiFetch";
import { cookies } from "next/headers";
import { success } from "zod";

type CategoryPayload = {
    name: string;
    icon: string;
}
type CategoryReturnType = {
    success: boolean;
    message: string;
}

export async function addCategoryApi(payload: CategoryPayload): Promise<CategoryReturnType>{

    const res = await apiFetch(`${API_BASE_URL}/category/`, {
        method: "POST",
        body: JSON.stringify(payload)
    })

    const data = await res.json();

    if (!res.ok){
        return {
            success: false,
            message: data.message || "Failed to create category",
        };
    }
    
    return {
        success: true,
        message: ''
    }
}

export async function getIconListApi(){

    const res = await apiFetch(`${API_BASE_URL}/category/icon-list`);
    const data = await res.json();

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to load category icons",
            data: []
        }
    }

    return {
        success: true,
        message: data.message,
        data: data.result
    }
}

type AllCatResponse = CategoryReturnType & {
    data: {
        id: string,
        name: string,
        icon: string,
        createdAt: string,
    }[]
}

export async function getAllCategoryApi():Promise<AllCatResponse>{

    const res = await apiFetch(`${API_BASE_URL}/category`)

    const data = await res.json()

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to load categories",
            data: []
        }
    }

    return {
        success: true,
        message: data.message,
        data: data.result
    }

}


export async function deleteCategoryApi(id:string){
    const res = await apiFetch(`${API_BASE_URL}/category/${id}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to delete category"
        }
    }

    return {
        success: true,
        message: "Category deleted successfully"
    }
}


export async function getCategoryByIdApi(id:string){
    const res = await apiFetch(`${API_BASE_URL}/category/${id}`)

    const data = await res.json()

    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to load category detail",
        }
    }

    return {
        success: true,
        message: "Category detail fetched successfully",
        data: data.result
    }
}

export async function updateCategoryApi({id, payload}: {id:string, payload: CategoryPayload}) {
    const res = await apiFetch(`${API_BASE_URL}/category/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    })

    const data = await res.json()

    if(!res.ok){
        return {
            success: false, 
            message: data.message || "Failed to update your category"
        }
    }

    return {
        success: true,
        message: data.message || "Successfully updated"
    }
}