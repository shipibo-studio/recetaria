"use client"

import { FormEvent, useEffect, useState } from "react"

export default function AjustesPage() {
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState("")
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadSettings() {
      try {
        const response = await fetch("/api/user/openrouter", { cache: "no-store" })
        if (!response.ok) {
          throw new Error("No se pudo cargar la configuración")
        }

        const payload = (await response.json()) as { apiKey?: string; model?: string }

        if (!isMounted) {
          return
        }

        setApiKey(payload.apiKey ?? "")
        setModel(payload.model ?? "")
      } catch {
        if (!isMounted) {
          return
        }

        setStatus("No se pudo cargar tu configuración actual.")
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSettings()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setStatus("")
    setIsSaving(true)

    try {
      const response = await fetch("/api/user/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey, model }),
      })

      if (!response.ok) {
        throw new Error("No se pudo guardar la configuración")
      }

      setStatus("Configuración guardada.")
    } catch {
      setStatus("No se pudo guardar. Inténtalo de nuevo.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <header className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Ajustes</h1>
        <p className="text-slate-500">
          Configura tu acceso a OpenRouter para generar recetas con IA.
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold uppercase tracking-wider text-slate-500"
            htmlFor="openrouter-api-key"
          >
            API KEY de OpenRouter
          </label>
          <input
            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base outline-none transition-all placeholder:text-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
            id="openrouter-api-key"
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="sk-or-v1-..."
            type="text"
            value={apiKey}
            disabled={isLoading || isSaving}
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-semibold uppercase tracking-wider text-slate-500"
            htmlFor="openrouter-model"
          >
            Modelo de OpenRouter
          </label>
          <input
            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base outline-none transition-all placeholder:text-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
            id="openrouter-model"
            onChange={(event) => setModel(event.target.value)}
            placeholder="openai/gpt-4.1-mini"
            type="text"
            value={model}
            disabled={isLoading || isSaving}
          />
        </div>

        <button
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          type="submit"
          disabled={isLoading || isSaving}
        >
          {isSaving ? "Guardando..." : "Guardar"}
        </button>

        {status ? <p className="text-sm text-slate-500">{status}</p> : null}
      </form>
    </main>
  )
}
