export default function Loading() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between border-b pb-5 mb-5">
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="h-12 bg-gray-100" />

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-4 py-4 border-t"
          >
            <div className="h-9 w-9 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}