
export default function Loading() {
  const skeletonClass = "bg-muted-foreground/15 rounded animate-pulse";

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 border-b border-border pb-5 mb-6">
        <div className={`h-9 w-9 rounded-md ${skeletonClass}`} />

        <div>
          <div className={`h-7 w-56 mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-72 ${skeletonClass}`} />
        </div>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className={`h-7 w-48 mb-3 ${skeletonClass}`} />
          <div className={`h-6 w-24 rounded-full ${skeletonClass}`} />
        </div>

        <div className={`h-10 w-32 ${skeletonClass}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-24 rounded-lg border border-border bg-muted/40 animate-pulse" />
        <div className="h-24 rounded-lg border border-border bg-muted/40 animate-pulse" />
      </div>

      <div className="h-28 rounded-lg border border-border bg-muted/40 animate-pulse mt-4" />

      <div className="h-56 rounded-lg border border-border bg-muted/40 animate-pulse mt-4" />

      <div className="flex justify-end gap-3 mt-6">
        <div className={`h-10 w-24 ${skeletonClass}`} />
        <div className={`h-10 w-36 ${skeletonClass}`} />
      </div>
    </div>
  );
}
