
export default function Loading() {
    const skeleton = "bg-muted-foreground/15 rounded animate-pulse";
    const field = "bg-muted/40 border border-border rounded-md animate-pulse";

    return (
        <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 lg:p-12 rounded-lg max-w-[850px] mx-auto shadow-sm">

            {/* Header */}
            <div className="mb-8">
                <div className={`h-7 w-56 mb-3 ${skeleton}`} />
                <div className={`h-4 w-72 max-w-full ${skeleton}`} />
            </div>

            {/* Profile and Account Fields */}
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">

                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                    <div className="h-[100px] w-[100px] rounded-full bg-muted-foreground/15 animate-pulse" />

                    <div className={`h-10 w-36 ${skeleton}`} />
                </div>

                {/* Personal Information */}
                <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* First Name */}
                        <div>
                            <div className={`h-4 w-24 mb-3 ${skeleton}`} />
                            <div className={`h-10 w-full ${field}`} />
                        </div>

                        {/* Last Name */}
                        <div>
                            <div className={`h-4 w-24 mb-3 ${skeleton}`} />
                            <div className={`h-10 w-full ${field}`} />
                        </div>

                        {/* Email */}
                        <div>
                            <div className={`h-4 w-16 mb-3 ${skeleton}`} />
                            <div className={`h-10 w-full ${field}`} />
                        </div>

                        {/* Member Since */}
                        <div>
                            <div className={`h-4 w-28 mb-3 ${skeleton}`} />
                            <div className={`h-10 w-full ${field}`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-8">
                <div className={`h-10 w-36 ${skeleton}`} />
            </div>
        </div>
    );
}
