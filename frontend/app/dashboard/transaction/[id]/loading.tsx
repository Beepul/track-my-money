export default function Loading() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 border-b pb-5 mb-6">
        <div className="h-9 w-9 rounded-md bg-gray-200 animate-pulse" />

        <div>
          <div className="h-7 w-56 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>

        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-24 rounded-lg border bg-gray-100 animate-pulse" />
        <div className="h-24 rounded-lg border bg-gray-100 animate-pulse" />
      </div>

      <div className="h-28 rounded-lg border bg-gray-100 animate-pulse mt-4" />

      <div className="h-56 rounded-lg border bg-gray-100 animate-pulse mt-4" />

      <div className="flex justify-end gap-3 mt-6">
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}