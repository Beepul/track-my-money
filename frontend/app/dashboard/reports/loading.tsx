
export default function Loading() {
    const skeleton = "bg-muted-foreground/15 rounded animate-pulse";
    const field = "bg-muted/40 border border-border rounded-md animate-pulse";

    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">

            {/* Header */}
            <div className="border-b border-border pb-5 mb-5">
                <div className={`h-7 w-36 mb-2 ${skeleton}`} />
                <div className={`h-4 w-72 max-w-full ${skeleton}`} />
            </div>

            {/* Report Filters */}
            <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div key={index}>
                            <div className={`h-4 w-24 mb-2 ${skeleton}`} />
                            <div className={`h-11 w-full ${field}`} />
                        </div>
                    ))}

                    <div className="flex items-end">
                        <div className={`h-11 w-full ${skeleton}`} />
                    </div>
                </div>
            </div>

            {/* Quick Downloads */}
            <div className="mb-6">
                <div className={`h-4 w-32 mb-3 ${skeleton}`} />

                <div className="flex flex-wrap gap-3">
                    <div className={`h-10 w-36 ${skeleton}`} />
                    <div className={`h-10 w-32 ${skeleton}`} />
                    <div className={`h-10 w-36 ${skeleton}`} />
                </div>
            </div>

            {/* Report Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {Array.from({ length: 4 }, (_, index) => (
                    <div
                        key={index}
                        className="rounded-lg border border-border bg-card p-4 lg:p-6 flex items-center gap-4 shadow-sm"
                    >
                        <div className={`h-12 w-12 shrink-0 rounded-full ${skeleton}`} />

                        <div className="flex-1">
                            <div className={`h-4 w-24 mb-3 ${skeleton}`} />
                            <div className={`h-7 w-32 max-w-full ${skeleton}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction Statement */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">

                {/* Table Heading */}
                <div className="p-5 border-b border-border">
                    <div className={`h-6 w-48 mb-2 ${skeleton}`} />
                    <div className={`h-4 w-80 max-w-full ${skeleton}`} />
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[650px]">

                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 bg-muted/50 px-4 py-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div
                                    key={index}
                                    className={`h-4 w-20 max-w-full ${skeleton}`}
                                />
                            ))}
                        </div>

                        {/* Table Rows */}
                        {Array.from({ length: 5 }, (_, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-5 items-center gap-4 px-4 py-4 border-t border-border"
                            >
                                <div className={`h-4 w-24 max-w-full ${skeleton}`} />
                                <div className={`h-4 w-32 max-w-full ${skeleton}`} />
                                <div className={`h-4 w-20 max-w-full ${skeleton}`} />
                                <div className={`h-6 w-20 rounded-full max-w-full ${skeleton}`} />
                                <div className={`h-4 w-24 max-w-full ${skeleton}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className={`h-4 w-20 ${skeleton}`} />
                        <div className={`h-4 w-24 ${skeleton}`} />
                        <div className={`h-9 w-20 ${skeleton}`} />
                        <div className={`h-4 w-16 ${skeleton}`} />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`h-9 w-24 ${skeleton}`} />
                        <div className={`h-9 w-9 ${skeleton}`} />
                        <div className={`h-9 w-9 ${skeleton}`} />
                        <div className={`h-9 w-9 ${skeleton}`} />
                        <div className={`h-9 w-20 ${skeleton}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
