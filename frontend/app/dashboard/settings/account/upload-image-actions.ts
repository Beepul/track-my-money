
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type UploadImageResult = {
    success: boolean;
    message: string;
    image?: string;
};

export async function uploadProfileImageAction(
    formData: FormData
): Promise<UploadImageResult> {
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
        return {
            success: false,
            message: "Please select an image.",
        };
    }

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
        return {
            success: false,
            message: "Only JPG, PNG and WebP images are allowed.",
        };
    }

    if (file.size > 2 * 1024 * 1024) {
        return {
            success: false,
            message: "Image must be smaller than 2 MB.",
        };
    }

    const token = (await cookies()).get("T2M_LOGIN")?.value;

    if (!token) {
        return {
            success: false,
            message: "Please sign in again.",
        };
    }

    try {
        const uploadData = new FormData();
        uploadData.append("image", file);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile/image`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: uploadData,
                cache: "no-store",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Image upload failed.",
            };
        }

        revalidatePath("/dashboard", "layout");

        return {
            success: true,
            message: "Profile image updated successfully.",
            image: data.image,
        };
    } catch {
        return {
            success: false,
            message: "Something went wrong while uploading.",
        };
    }
}
