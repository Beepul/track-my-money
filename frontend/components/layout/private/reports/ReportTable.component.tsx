"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Transaction } from "@/app/dashboard/transaction/actions";

type ReportTableProps = {
  transactions: Transaction[];
  fromDate: string;
  toDate: string;
  meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    category: string; type: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ReportTable({ transactions, fromDate, toDate, meta, category, type }: ReportTableProps) {

    const router = useRouter();
    const changeLimit = (value: string) => {
        router.push(`/dashboard/reports?fd=${fromDate}&td=${toDate}&page=1&limit=${value}&c=${category}&t=${type}`);
    }; 
  if (!transactions.length) {
    return (
      <div className="rounded-lg border border-dashed bg-gray-50 p-10 text-center">
        <p className="font-medium text-t2m-text-primary">No report data found</p>
        <p className="text-sm text-t2m-text-secondary mt-1">
          Select a date range and generate a report.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <div className="p-5 border-b">
        <h3 className="text-lg font-semibold text-t2m-text-primary">
          Transaction Statement 
        </h3>
        <p className="text-sm text-t2m-text-secondary">
          Detailed income and expense report from <span className="font-semibold">{fromDate}</span> to <span className="font-semibold">{toDate}</span>
        </p>
      </div>

      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "INCOME";

            return (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>

                <TableCell className="font-medium capitalize">
                  {transaction.title}
                </TableCell>

                <TableCell className="capitalize">
                  {transaction.category?.name || "Uncategorized"}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      isIncome
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>

                <TableCell
                  className={`text-right font-semibold ${
                    isIncome ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
        <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500">
                    Page {meta.page} of {meta.totalPages}
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Rows per page</span>

                    <Select value={String(meta.limit)} onValueChange={changeLimit}>
                        <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p className="text-sm text-gray-500 whitespace-nowrap">
                    Total: {meta.total}
                </p>
            </div>

            <div className="flex items-center gap-2">
                {meta.page <= 1 ? <>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={meta.page <= 1}
                        className={meta.page <= 1 ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </Button>
                </> : <>
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                        disabled={meta.page <= 1}
                        className={meta.page <= 1 ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        <Link href={`/dashboard/reports?page=${meta.page - 1}&limit=${meta.limit}&c=${category}&t=${type}&fd=${fromDate}&td=${toDate}`}>
                            <ChevronLeft size={16} />
                            Previous
                        </Link>
                    </Button>
                </>}

                <div className="flex items-center gap-1">
                    {Array.from({ length: meta.totalPages }).map((_, index) => {
                        const page = index + 1;

                        return (
                            <Button
                                key={page}
                                variant={page === meta.page ? "default" : "outline"}
                                size="sm"
                                asChild
                                className={
                                    page === meta.page
                                        ? "bg-t2m-primary hover:bg-t2m-primary cursor-default"
                                        : "cursor-pointer hover:bg-gray-50"
                                }
                            >
                                <Link href={`/dashboard/reports?page=${page}&limit=${meta.limit}&c=${category}&t=${type}&fd=${fromDate}&td=${toDate}`}>
                                    {page}
                                </Link>
                            </Button>
                        );
                    })}
                </div>

                {
                    meta.page >= meta.totalPages ? <>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={meta.page >= meta.totalPages}
                            className={
                                meta.page >= meta.totalPages ? "cursor-not-allowed" : "cursor-pointer"
                            }
                        >
                            Next
                            <ChevronRight size={16} />
                        </Button>
                    </> : <>
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            disabled={meta.page >= meta.totalPages}
                            className={
                                meta.page >= meta.totalPages ? "cursor-not-allowed" : "cursor-pointer"
                            }
                        >
                            <Link href={`/dashboard/reports?page=${meta.page + 1}&limit=${meta.limit}&c=${category}&t=${type}&fd=${fromDate}&td=${toDate}`}>
                                Next
                                <ChevronRight size={16} />
                            </Link>
                        </Button>
                    </>
                }
            </div>
        </div>
    </div>
  );
}