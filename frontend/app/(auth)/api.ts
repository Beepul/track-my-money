import { API_BASE_URL } from "@/config/api.config";

type RegisterPayloadType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
type RegisterReturnType = {
    success: boolean;
    message: string;
}
export async function registerUserApi(payload:RegisterPayloadType):Promise<RegisterReturnType>{
    const res = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    if (!res.ok){
        return {
            success: false,
            message: data.message || "Registration failed",
        };
    }
    console.log("Hurry",data)
    return {
        success: true,
        message: ''
    }
}
type UserLoginDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    image?: string;
    googleId?: string;
    createdAt: Date;
    accessToken: string;
}
type SignInPayloadType = {
    email: string;
    password: string;
}
type SignInReturnType = {
    success: boolean;
    message: string;
    data?: UserLoginDataType
}

export async function signInUserApi(payload:SignInPayloadType):Promise<SignInReturnType>{
    const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
  
    if (!res.ok){
        return {
            success: false,
            message: data.message || "Login failed",
        };
    }

    return {
        success: true,
        message: '',
        data: data.result
    }
}