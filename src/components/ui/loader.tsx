export function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
        <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-primary"></div>
      </div>
    </div>
  )
}

export function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-48 rounded bg-slate-200"></div>
        <div className="h-12 w-full rounded-lg bg-slate-100"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-48 rounded bg-slate-200"></div>
        <div className="h-12 w-full rounded-lg bg-slate-100"></div>
      </div>
      <div className="h-11 w-32 rounded-lg bg-slate-200"></div>
    </div>
  )
}
