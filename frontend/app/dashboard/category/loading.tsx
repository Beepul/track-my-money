
export default function Loading() {
  const skeletonClass = "bg-muted-foreground/15 rounded animate-pulse";

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between border-b border-border pb-5 mb-5">
        <div>
          <div className={`h-7 w-48 mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-72 max-w-full ${skeletonClass}`} />
        </div>

        <div className={`h-10 w-36 ${skeletonClass}`} />
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <div className="h-12 bg-muted/50 animate-pulse" />

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-4 py-4 border-t border-border"
          >
            <div className={`h-9 w-9 ${skeletonClass}`} />
            <div className={`h-4 w-32 ${skeletonClass}`} />
            <div className={`h-8 w-36 ${skeletonClass}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
