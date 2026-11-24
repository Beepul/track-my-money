
export default function Loading() {
    const skeleton = "bg-muted-foreground/15 rounded animate-pulse";
    const field = "bg-muted/40 border border-border rounded-lg animate-pulse";

    return (
        <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 lg:p-12 rounded-lg max-w-[850px] mx-auto shadow-sm">

            {/* Header */}
            <div className="mb-6">
                <div className={`h-7 w-32 mb-3 ${skeleton}`} />
                <div className={`h-4 w-80 max-w-full ${skeleton}`} />
            </div>

            {/* Password Fields */}
            <div className="space-y-6">
                {Array.from({ length: 3 }, (_, index) => (
                    <div key={index}>
                        {/* Field Label */}
                        <div className={`h-4 w-36 mb-3 ${skeleton}`} />

                        {/* Password Input */}
                        <div className={`h-10 w-full flex items-center justify-end px-3 ${field}`}>
                            {/* Show/Hide Password Icon */}
                            <div className="h-5 w-5 rounded bg-muted-foreground/15" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Password Button */}
            <div className="flex justify-end mt-8">
                <div className={`h-10 w-40 ${skeleton}`} />
            </div>
        </div>
    );
}
