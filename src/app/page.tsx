import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">RecetarIA</h1>
        <p className="text-muted-foreground">
          Página principal del proyecto. Desde aquí puedes iniciar sesión o entrar
          al área principal de la aplicación.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Ir a Iniciar sesión
          </Link>
          <Link href="/app" className="rounded-md border px-4 py-2">
            Ir a la App
          </Link>
        </div>
      </section>
    </main>
  )
}
