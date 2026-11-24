
export default function Loading() {
    const skeleton = "bg-muted-foreground/15 rounded animate-pulse";

    return (
        <main className="flex w-full justify-center">
            <div className="w-full max-w-[650px] rounded-lg border border-border bg-card p-6 sm:p-8 shadow-sm">

                {/* Header */}
                <div className="mb-6">
                    <div className={`h-7 w-52 mb-2 ${skeleton}`} />
                    <div className={`h-4 w-64 max-w-full ${skeleton}`} />
                </div>

                {/* Category Name */}
                <div className="mb-6">
                    <div className={`h-4 w-16 mb-3 ${skeleton}`} />
                    <div className="h-12 w-full rounded-md border border-border bg-muted/40 animate-pulse" />
                </div>

                {/* Category Icons */}
                <div className="mb-6">
                    <div className={`h-4 w-12 mb-3 ${skeleton}`} />

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {Array.from({ length: 18 }, (_, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-muted/30 p-3 animate-pulse"
                            >
                                <div className="h-6 w-6 rounded bg-muted-foreground/15" />
                                <div className="h-3 w-full max-w-12 rounded bg-muted-foreground/15" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-5 pt-6">
                    <div className={`h-11 flex-1 ${skeleton}`} />
                    <div className={`h-11 flex-1 ${skeleton}`} />
                </div>
            </div>
        </main>
    );
}
