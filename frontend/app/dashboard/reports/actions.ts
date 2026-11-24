"use server"

import { ReportFormSchema } from "@/lib/zod.definitions";
import { redirect } from "next/navigation";

export type ReportState = {
  success: boolean;
  message: string;
  formData: {
    from_date: string;
    to_date: string;
    category: string;
    type: string;
  };
  errors: {
    from_date?: string[];
    to_date?: string[];
    category?: string[];
    type?: string[];
  };
};
export default async function getReportActions(
    prevState: ReportState,
    formData: FormData
): Promise<ReportState> {
    const rawData = {
        from_date: String(formData.get("from_date") ?? ""),
        to_date: String(formData.get("to_date") ?? ""),
        category: String(formData.get("category") ?? "all"),
        type: String(formData.get("type") ?? "ALL"),
    };

    const validFields = ReportFormSchema.safeParse(rawData);

    if (!validFields.success) {
        return {
            errors: validFields.error.flatten().fieldErrors,
            success: false,
            formData: rawData,
            message: "Please fix the errors in the form.",
        };
    }

    const fd = validFields.data.from_date.toISOString().split("T")[0];
    const td = validFields.data.to_date.toISOString().split("T")[0];

    const params = new URLSearchParams({
        fd,
        td,
        c: validFields.data.category,
        t: validFields.data.type,
        page: "1",
        limit: "5",
    });

    redirect(`/dashboard/reports?${params.toString()}`);
}