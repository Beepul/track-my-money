"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GetMyProfileApi } from "./api";
import {
    UpdateUserPreferenceApi,
    type UpdatePreferencePayload
} from "./api";
import { revalidatePath } from "next/cache";

export async function logout() {
    const cookieStore = await cookies();

    cookieStore.delete("T2M_LOGIN");
    cookieStore.delete("T2M_REFRESH");

    redirect("/signin");
}



export const updateUserPreferenceAction = async (
    payload: UpdatePreferencePayload
) => {
    const response = await UpdateUserPreferenceApi(payload);

    if (response.success) {
        revalidatePath("/dashboard", "layout");
    }

    return response;
};