"use client"

import { ResetPasswordForm } from "@neondatabase/auth/react/ui"
import Link from "next/link"
import { useEffect, useState } from "react"

import { esLocalization } from "@/lib/auth-localization"

export default function RestablecerContrasenaPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Restablecer contraseña</h1>
          <p className="text-sm text-slate-500">
            Ingresa tu nueva contraseña
          </p>
        </div>
        {mounted && <ResetPasswordForm localization={esLocalization} />}
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
