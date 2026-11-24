
export default function Loading() {
  const skeletonClass = "bg-muted-foreground/15 rounded animate-pulse";

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between border-b border-border pb-5 mb-5">
        <div>
          <div className={`h-7 w-52 mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-72 ${skeletonClass}`} />
        </div>

        <div className={`h-10 w-40 ${skeletonClass}`} />
      </div>

      <div className="mb-5 rounded-lg border border-border bg-muted/30 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <div className={`h-4 w-20 mb-2 ${skeletonClass}`} />
              <div className={`h-11 w-full ${skeletonClass}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <div className="h-12 bg-muted/50" />

        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="grid grid-cols-6 items-center gap-4 px-4 py-4 border-t border-border"
          >
            <div className={`h-4 w-32 ${skeletonClass}`} />
            <div className={`h-6 w-20 rounded-full ${skeletonClass}`} />
            <div className={`h-4 w-24 ${skeletonClass}`} />
            <div className={`h-4 w-28 ${skeletonClass}`} />
            <div className={`h-4 w-32 ${skeletonClass}`} />
            <div className={`h-8 w-32 ml-auto ${skeletonClass}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
