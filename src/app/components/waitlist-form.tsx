"use client"

import { FormEvent, useState } from "react"

type FormStatus = "idle" | "loading" | "success" | "error"
const STATICFORMS_ENDPOINT = "https://api.staticforms.dev/submit"

export function WaitlistForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const apiKey = process.env.NEXT_PUBLIC_STATICFORMS_API_KEY

    if (!apiKey) {
      setStatus("error")
      setMessage("Falta configurar NEXT_PUBLIC_STATICFORMS_API_KEY en el cliente.")
      return
    }

    formData.append("apiKey", apiKey)
    formData.append("name", "RecetarIA Lista de espera")
    formData.append("message", "Nueva suscripcion a la lista de espera")

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch(STATICFORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      })

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean
        message?: string
      }

      if (!response.ok || data.success !== true) {
        setStatus("error")
        setMessage(data.message || "No pudimos registrar tu correo. Intenta nuevamente.")
        return
      }

      setStatus("success")
      setMessage("Gracias, te agregamos a la lista de espera.")
      form.reset()
    } catch {
      setStatus("error")
      setMessage("No pudimos registrar tu correo. Intenta nuevamente.")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <input
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          name="honeypot"
          type="text"
        />
        <div className="w-full max-w-md">
          <label className="sr-only" htmlFor="email-address">Correo electronico</label>
          <input
            autoComplete="email"
            className="w-full rounded-xl border-0 bg-white/10 px-6 py-4 text-white ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm placeholder:text-slate-400"
            id="email-address"
            name="email"
            placeholder="tu@correo.com"
            required
            type="email"
            disabled={status === "loading"}
          />
        </div>
        <button
          className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando..." : "Notificarme"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-sm font-semibold text-green-300">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm font-semibold text-red-300">{message}</p>
      )}

      <p className="mt-4 text-sm text-slate-400">Sin spam. Solo noticias deliciosas.</p>
    </>
  )
}
