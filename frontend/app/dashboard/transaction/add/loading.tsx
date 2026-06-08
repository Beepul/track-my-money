export default function Loading() {
  return (
    <main className="flex">
      <div className="bg-white m-auto p-8 shadow-sm rounded-lg min-w-[650px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-7 w-56 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="h-4 w-72 bg-gray-200 rounded animate-pulse mb-6" />

        {/* Transaction Type */}
        <div className="mb-6">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="flex gap-3">
            <div className="h-12 flex-1 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 flex-1 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Fields */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="mb-5">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-5 pt-6">
          <div className="h-11 flex-1 bg-gray-200 rounded animate-pulse" />
          <div className="h-11 flex-1 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}