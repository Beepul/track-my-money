import CategoryForm from "@/components/layout/private/CategoryForm.component";
import Link from "next/link";
import { getIconListApi } from "../api";
import { ArrowLeft } from "lucide-react";

export default async function AddCategoryPage () {
    const categoryIcons = await getIconListApi()
    const icons = categoryIcons.success ? categoryIcons.data : [];
    return (
        <main className="flex">
            <div className="bg-white m-auto p-8 shadow-sm rounded-lg min-w-[650px]"> 
                <div className="flex items-center gap-2 mb-1">
                    <Link href={"/dashboard/category"}><ArrowLeft /></Link>
                    <h2 className="text-xl font-medium text-t2m-text-primary">Create New Category</h2>
                </div>
                <p className="mb-5">Add your choice of category below</p>
                <>
                    <CategoryForm categoryIcons={icons}/>
                </>
            </div>
        </main>
    )
}