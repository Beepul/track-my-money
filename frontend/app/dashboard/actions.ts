"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GetMyProfileApi } from "./api";

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("T2M_LOGIN");
  cookieStore.delete("accessToken");
  cookieStore.delete("T2M_JWT");

  redirect("/signin");
}

// export const getMyProfileAction = async () => {
//   const profile = await GetMyProfileApi();

//   if(!profile.success){
//     return profile
//   }

//   const cookieStore = await cookies();

//   cookieStore.set('T2M_USER_PROFILE', profile.data, { 
//     httpOnly: true, 
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 60 * 60 * 24 * 4,
//     path: '/'
//   })

//   return profile
// }


