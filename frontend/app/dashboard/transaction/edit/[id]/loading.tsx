export default function Loading() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-5 mb-6">
        <div className="h-9 w-9 rounded-md bg-gray-200 animate-pulse" />

        <div className="flex-1">
          <div className="h-7 w-80 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Transaction Type */}
      <div className="mb-6">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3" />

        <div className="flex gap-3">
          <div className="h-14 flex-1 rounded-lg bg-gray-100 border animate-pulse" />
          <div className="h-14 flex-1 rounded-lg bg-gray-100 border animate-pulse" />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-12 w-full bg-gray-100 border rounded-md animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-12 w-full bg-gray-100 border rounded-md animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-14 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-12 w-full bg-gray-100 border rounded-md animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-12 w-full bg-gray-100 border rounded-md animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-24 w-full bg-gray-100 border rounded-md animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-12 w-full bg-gray-100 border rounded-md animate-pulse" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-5 pt-6">
        <div className="h-12 flex-1 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-12 flex-1 bg-gray-200 rounded-md animate-pulse" />
      </div>
    </div>
  );
}