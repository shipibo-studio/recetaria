"use client"

import { ForgotPasswordForm } from "@neondatabase/auth/react/ui"
import Link from "next/link"
import { useEffect, useState } from "react"

import { esLocalization } from "@/lib/auth-localization"

export default function RecuperarContrasenaPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Recuperar contraseña</h1>
          <p className="text-sm text-slate-500">
            Te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>
        {mounted && <ForgotPasswordForm localization={esLocalization} />}
        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-slate-500 transition-colors hover:text-primary"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </section>
    </main>
  )
}
