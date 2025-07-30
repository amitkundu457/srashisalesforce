export function LeadTypeSkeletonLayout() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
          style={{ height: '30px' }}
        ></div>
      ))}
    </div>
  );
}
