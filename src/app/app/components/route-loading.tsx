type AppRouteLoadingProps = {
  title: string
  description: string
}

export function AppRouteLoading({ title, description }: AppRouteLoadingProps) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <section className="rounded-2xl border border-slate-100 bg-white p-8">
        <div className="mb-4 h-6 w-56 animate-pulse rounded bg-slate-200" />
        <div className="mb-8 h-4 w-72 animate-pulse rounded bg-slate-100" />

        <div className="mb-6 flex items-center gap-3 text-slate-500">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-medium">{title}</span>
        </div>

        <p className="text-sm text-slate-500">{description}</p>
      </section>
    </main>
  )
}
