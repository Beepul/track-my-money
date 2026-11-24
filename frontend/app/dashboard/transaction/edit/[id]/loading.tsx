
export default function Loading() {
  const skeletonClass = "bg-muted-foreground/15 rounded animate-pulse";
  const fieldClass = "bg-muted/40 border border-border rounded-md animate-pulse";

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border pb-5 mb-6">
        <div className={`h-9 w-9 rounded-md ${skeletonClass}`} />

        <div className="flex-1">
          <div className={`h-7 w-80 max-w-full mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-56 max-w-full ${skeletonClass}`} />
        </div>
      </div>

      {/* Transaction Type */}
      <div className="mb-6">
        <div className={`h-5 w-32 mb-3 ${skeletonClass}`} />

        <div className="flex gap-3">
          <div className={`h-14 flex-1 rounded-lg ${fieldClass}`} />
          <div className={`h-14 flex-1 rounded-lg ${fieldClass}`} />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div>
          <div className={`h-4 w-16 mb-2 ${skeletonClass}`} />
          <div className={`h-12 w-full ${fieldClass}`} />
        </div>

        <div>
          <div className={`h-4 w-20 mb-2 ${skeletonClass}`} />
          <div className={`h-12 w-full ${fieldClass}`} />
        </div>

        <div>
          <div className={`h-4 w-14 mb-2 ${skeletonClass}`} />
          <div className={`h-12 w-full ${fieldClass}`} />
        </div>

        <div>
          <div className={`h-4 w-20 mb-2 ${skeletonClass}`} />
          <div className={`h-12 w-full ${fieldClass}`} />
        </div>

        <div>
          <div className={`h-4 w-28 mb-2 ${skeletonClass}`} />
          <div className={`h-24 w-full ${fieldClass}`} />
        </div>

        <div>
          <div className={`h-4 w-16 mb-2 ${skeletonClass}`} />
          <div className={`h-12 w-full ${fieldClass}`} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-5 pt-6">
        <div className={`h-12 flex-1 rounded-md ${skeletonClass}`} />
        <div className={`h-12 flex-1 rounded-md ${skeletonClass}`} />
      </div>
    </div>
  );
}
