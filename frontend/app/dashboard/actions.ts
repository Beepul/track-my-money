"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("T2M_LOGIN");
  cookieStore.delete("accessToken");
  cookieStore.delete("T2M_JWT");

  redirect("/signin");
}