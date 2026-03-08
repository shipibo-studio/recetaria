import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Iniciar sesión</h1>
        <p className="text-muted-foreground">
          Ruta base de autenticación. Aquí desarrollaremos el inicio de sesión.
        </p>
        <Link href="/" className="inline-flex rounded-md border px-4 py-2">
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}
