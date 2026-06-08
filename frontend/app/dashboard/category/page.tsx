import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { getAllCategoryApi } from "./api";
import CategoryTable from "@/components/layout/private/category/CategoryTable.component";

export default async function CategoryPage() {
    const res = await getAllCategoryApi()
   
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between border-b pb-5 mb-5">
        <div>
          <h2 className="text-2xl font-semibold text-t2m-text-primary">
            Your Categories
          </h2>
          <p className="text-sm text-t2m-text-secondary mt-1">
            Manage your income and expense categories
          </p>
        </div>

        <Button asChild className="bg-t2m-primary px-6 hover:bg-t2m-secondary">
          <Link href="/dashboard/category/add">
            <Plus size={16} />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoryTable data={res.data}/>
    </div>
  );
}