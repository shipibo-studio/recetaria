"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface HistoryRecipe {
  id: string
  title: string
  description: string
  level: string
  time: string
  servings: number
  ingredients: string[]
  instructions: string[]
  image?: string
}

interface HistoryEntry {
  id: number
  ingredients: string
  skillLevel: string
  servings: number
  recipes: HistoryRecipe[]
  createdAt: string
}

export default function HistorialPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    async function loadHistory() {
      try {
        const response = await fetch("/api/user/history", { cache: "no-store" })

        if (!response.ok) {
          throw new Error("No se pudo cargar el historial")
        }

        const data = (await response.json()) as { entries?: HistoryEntry[] }

        if (!active) {
          return
        }

        setEntries(data.entries || [])
      } catch (err) {
        if (!active) {
          return
        }

        setError(err instanceof Error ? err.message : "No se pudo cargar el historial")
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadHistory()

    return () => {
      active = false
    }
  }, [])

  const handleRestore = (entry: HistoryEntry) => {
    const recipeIds: string[] = []

    entry.recipes.forEach((recipe) => {
      localStorage.setItem(recipe.id, JSON.stringify(recipe))
      recipeIds.push(recipe.id)
    })

    localStorage.setItem("current-recipe-ids", JSON.stringify(recipeIds))
    router.push("/app")
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Historial de búsquedas</h1>
        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-tighter text-slate-500">
          {entries.length} registro{entries.length !== 1 ? "s" : ""}
        </span>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!error && entries.length === 0 && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-8 text-center text-slate-600">
          Aún no tienes búsquedas guardadas en el historial.
        </div>
      )}

      {!error && entries.length > 0 && (
        <div className="space-y-4">
          {entries.map((entry) => (
            <article key={entry.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-700">
                  {new Date(entry.createdAt).toLocaleString("es-PE")}
                </p>
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-tighter text-slate-500">
                  {entry.recipes.length} receta{entry.recipes.length !== 1 ? "s" : ""}
                </span>
              </div>

              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Ingredientes:</span> {entry.ingredients}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Nivel:</span> {entry.skillLevel} · {entry.servings} {entry.servings === 1 ? "persona" : "personas"}
              </p>

              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {entry.recipes.slice(0, 3).map((recipe) => (
                  <li key={recipe.id}>• {recipe.title}</li>
                ))}
              </ul>

              <button
                onClick={() => handleRestore(entry)}
                className="mt-4 inline-flex cursor-pointer items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ver estas recetas
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
