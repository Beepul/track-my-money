import { API_BASE_URL } from "@/config/api.config";
import { apiFetch } from "@/lib/apiFetch";

export async function ChangeAccountInfo({first_name, last_name}: {first_name: string, last_name: string}){
    const res = await apiFetch(`${API_BASE_URL}/user/update-info`, {
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name
        }),
        method: "PUT"
    })
    const data = await res.json()
    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to update info"
        }
    }

    return {
        success: true,
        message: data.message,
        data: data.result
    }
}


export async function UpdatePassword({currentPassword, newPassword, confirmPassword}: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}) {
    const res = await apiFetch(`${API_BASE_URL}/user/update-password`, {
        body: JSON.stringify({
            oldPassword: currentPassword,
            newPassword: newPassword, confirmPassword: confirmPassword
        }),
        method: "PUT"
    })
    const data = await res.json()
    console.log(data)
    
    if(!res.ok){
        return {
            success: false,
            message: data.message || "Failed to update password"
        }
    }

    return {
        success: true,
        message: data.message,
        data: data.result
    }
}