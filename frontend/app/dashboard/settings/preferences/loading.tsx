
export default function Loading() {
    const skeleton = "bg-muted-foreground/15 rounded animate-pulse";
    const dropdown = "bg-muted/40 border border-border rounded-md animate-pulse";

    return (
        <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 lg:p-12 rounded-lg max-w-[850px] mx-auto shadow-sm">

            {/* Header */}
            <div className="mb-6">
                <div className={`h-7 w-36 mb-3 ${skeleton}`} />
                <div className={`h-4 w-80 max-w-full ${skeleton}`} />
            </div>

            {/* Preference Fields */}
            <div className="space-y-6">
                {Array.from({ length: 5 }, (_, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                        {/* Preference Label */}
                        <div className="flex-1">
                            <div
                                className={`h-4 max-w-full ${
                                    index === 0
                                        ? "w-80"
                                        : index === 1
                                        ? "w-72"
                                        : index === 2
                                        ? "w-80"
                                        : index === 3
                                        ? "w-96"
                                        : "w-72"
                                } ${skeleton}`}
                            />
                        </div>

                        {/* Dropdown */}
                        <div className="w-full sm:w-[200px] shrink-0">
                            <div className={`h-10 w-full ${dropdown}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-8">
                <div className={`h-10 w-28 ${skeleton}`} />
                <div className={`h-10 w-28 ${skeleton}`} />
            </div>
        </div>
    );
}
