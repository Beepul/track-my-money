
import CategoryForm from "@/components/layout/private/category/CategoryForm.component";
import { getCategoryByIdApi, getIconListApi } from "../../api";

export default async function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const categoryIcons = await getIconListApi();
    const category = await getCategoryByIdApi(id);

    if (!category.success || !category.data) {
        return (
            <div className="rounded-lg border border-border bg-card p-6 text-center text-destructive">
                Failed to load category details.
            </div>
        );
    }

    return (
        <main className="flex w-full justify-center">
            <div className="w-full max-w-[650px] rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm text-card-foreground">
                <h2 className="text-xl font-medium text-t2m-text-primary capitalize">
                    Update &quot;{category.data.name}&quot;
                </h2>

                <p className="mb-5 mt-1 text-sm text-t2m-text-secondary">
                    Update your category details below
                </p>

                <CategoryForm
                    categoryIcons={categoryIcons.data}
                    mode="edit"
                    catDetails={category.data}
                />
            </div>
        </main>
    );
}
