
export default function Loading() {
    const skeletonClass = "bg-muted-foreground/15 rounded animate-pulse";
    const fieldClass = "bg-muted/40 border border-border rounded-md animate-pulse";

    return (
        <main className="flex w-full justify-center">
            <div className="w-full max-w-[650px] bg-card text-card-foreground border border-border p-6 sm:p-8 shadow-sm rounded-lg">

                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <div className={`h-6 w-6 ${skeletonClass}`} />
                    <div className={`h-7 w-56 ${skeletonClass}`} />
                </div>

                <div className={`h-4 w-72 max-w-full mb-6 ${skeletonClass}`} />

                {/* Transaction Type */}
                <div className="mb-6">
                    <div className={`h-4 w-32 mb-3 ${skeletonClass}`} />

                    <div className="flex gap-3">
                        <div className={`h-12 flex-1 ${fieldClass}`} />
                        <div className={`h-12 flex-1 ${fieldClass}`} />
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item}>
                            <div className={`h-4 w-24 mb-2 ${skeletonClass}`} />
                            <div className={`h-12 w-full ${fieldClass}`} />
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-5 pt-6">
                    <div className={`h-11 flex-1 ${skeletonClass}`} />
                    <div className={`h-11 flex-1 ${skeletonClass}`} />
                </div>
            </div>
        </main>
    );
}
