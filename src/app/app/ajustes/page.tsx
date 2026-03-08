"use client"

import { FormEvent, useState } from "react"

export default function AjustesPage() {
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 md:py-20">
      <header className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Ajustes</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Configura tu acceso a OpenRouter para generar recetas con IA.
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            htmlFor="openrouter-api-key"
          >
            API KEY de OpenRouter
          </label>
          <input
            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base outline-none transition-all placeholder:text-slate-300 focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-700"
            id="openrouter-api-key"
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="sk-or-v1-..."
            type="text"
            value={apiKey}
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
            htmlFor="openrouter-model"
          >
            Modelo de OpenRouter
          </label>
          <input
            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base outline-none transition-all placeholder:text-slate-300 focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-700"
            id="openrouter-model"
            onChange={(event) => setModel(event.target.value)}
            placeholder="openai/gpt-4.1-mini"
            type="text"
            value={model}
          />
        </div>

        <button
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </main>
  )
}
