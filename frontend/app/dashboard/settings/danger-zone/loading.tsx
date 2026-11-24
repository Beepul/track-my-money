
export default function Loading() {
    const skeleton = "bg-muted-foreground/15 rounded animate-pulse";

    return (
        <div className="w-full">
            <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 lg:p-12 rounded-lg max-w-[950px] mx-auto shadow-sm">

                {/* Warning Icon */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-24 w-24 rounded-full bg-red-100/50 dark:bg-red-950/40 flex items-center justify-center animate-pulse">
                        <div className="h-12 w-12 rounded-lg bg-red-200/60 dark:bg-red-900/50" />
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className={`h-7 w-36 mb-3 ${skeleton}`} />
                    <div className={`h-4 w-64 max-w-full ${skeleton}`} />
                </div>

                {/* Delete Account Section */}
                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-2 border-red-600/50 dark:border-red-800 bg-red-100/50 dark:bg-red-950/30 rounded-lg p-6 gap-6 animate-pulse">

                    {/* Description */}
                    <div className="flex-1">
                        <div className={`h-6 w-40 mb-3 ${skeleton}`} />
                        <div className={`h-4 w-72 max-w-full ${skeleton}`} />
                    </div>

                    {/* Delete Account Button */}
                    <div className="h-10 w-40 shrink-0 rounded-md bg-red-200/70 dark:bg-red-900/50" />
                </div>
            </div>
        </div>
    );
}
