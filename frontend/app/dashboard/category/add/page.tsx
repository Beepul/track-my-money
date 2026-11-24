
import CategoryForm from "@/components/layout/private/category/CategoryForm.component";
import Link from "next/link";
import { getIconListApi } from "../api";
import { ArrowLeft } from "lucide-react";

export default async function AddCategoryPage() {
    const categoryIcons = await getIconListApi();
    const icons = categoryIcons.success ? categoryIcons.data : [];

    return (
        <main className="flex w-full justify-center">
            <div className="w-full max-w-[650px] rounded-lg border border-border bg-card text-card-foreground p-6 sm:p-8 shadow-sm">

                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <Link
                        href="/dashboard/category"
                        aria-label="Back to categories"
                        className="text-t2m-text-primary hover:text-t2m-primary transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>

                    <h2 className="text-xl font-medium text-t2m-text-primary">
                        Create New Category
                    </h2>
                </div>

                <p className="mb-5 text-sm text-t2m-text-secondary">
                    Add your choice of category below
                </p>

                {/* Category Form */}
                <CategoryForm
                    categoryIcons={icons}
                    mode="create"
                />
            </div>
        </main>
    );
}
