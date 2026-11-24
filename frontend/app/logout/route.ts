
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();

    cookieStore.delete("T2M_LOGIN");
    cookieStore.delete("T2M_REFRESH");

    return NextResponse.redirect(
        new URL("/signin", request.url)
    );
}
