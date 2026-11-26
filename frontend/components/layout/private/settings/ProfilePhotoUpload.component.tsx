
"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadProfileImageAction } from "@/app/dashboard/settings/account/upload-image-actions";

type Props = {
    firstName: string;
    lastName: string;
    image?: string | null;
};

export default function ProfilePhotoUpload({
    firstName,
    lastName,
    image,
}: Props) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [currentImage, setCurrentImage] = useState(image || "");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setCurrentImage(image || "");
    }, [image]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const initials =
        `${firstName?.trim().charAt(0) || ""}${lastName?.trim().charAt(0) || ""}`.toUpperCase() || "U";

    const handleChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file || loading) return;

        setError("");

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Only JPG, PNG, WebP and AVIF images are supported.");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Image must be smaller than 2 MB.");
            event.target.value = "";
            return;
        }

        setPreview(URL.createObjectURL(file));
        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const result = await uploadProfileImageAction(formData);

            if (!result.success) {
                setError(result.message);
                return;
            }

            if (result.image) {
                setCurrentImage(result.image);
            }

            toast.success(result.message);
            router.refresh();
        } catch {
            setError("Unable to upload image.");
        } finally {
            setPreview("");
            setLoading(false);
            event.target.value = "";
        }
    };

    const imageSrc = preview || currentImage;

    return (
        <div className="mb-6 flex flex-col items-center gap-4 lg:mb-0">
            {imageSrc ? (
                preview ? (
                    <img
                        src={preview}
                        alt="Profile image preview"
                        className="h-[100px] w-[100px] rounded-full border border-border object-cover"
                    />
                ) : (
                    <Image
                        src={imageSrc}
                        alt={`${firstName}'s profile`}
                        width={100}
                        height={100}
                        className="h-[100px] w-[100px] rounded-full border border-border object-cover"
                        referrerPolicy="no-referrer"
                    />
                )
            ) : (
                <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-t2m-primary text-3xl font-semibold text-white">
                    {initials}
                </div>
            )}

            <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={loading}
                onClick={() => inputRef.current?.click()}
                className="cursor-pointer border-border bg-background text-foreground"
            >
                {loading ? (
                    <>
                        <LoaderCircle size={16} className="animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Camera size={16} />
                        Change Photo
                    </>
                )}
            </Button>

            <Input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleChange}
                disabled={loading}
                className="hidden"
            />

            <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP or AVIF. Maximum 2 MB.
            </p>

            {error && (
                <p role="alert" className="text-center text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
