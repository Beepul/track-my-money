import CategoryForm from "@/components/layout/private/category/CategoryForm.component";
import { getCategoryByIdApi, getIconListApi } from "../../api"

export default async function EditCategoryPage({params}: {params: Promise<{ id: string }>}){
    const { id } = await params;
    const categoryIcons = await getIconListApi()
    const category = await getCategoryByIdApi(id)
    
    if(!category.success && !category.data){
        return <div>Error</div>
    }
    return (
        <main className="flex">
            <div className="bg-white m-auto p-8 shadow-sm rounded-lg min-w-[650px]"> 
                <h2 className="text-xl font-medium text-t2m-text-primary capitalize">Update "{category.data.name}"</h2>
                <p className="mb-5">Update your category details below</p>
                <>
                    <CategoryForm categoryIcons={categoryIcons.data} mode="edit" catDetails={category.data}/>
                </>
            </div>
        </main>
    )
}