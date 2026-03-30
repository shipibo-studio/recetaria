"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface FavoriteRecipe {
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

export default function FavoritosPage() {
  const [recipes, setRecipes] = useState<FavoriteRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    async function loadFavorites() {
      try {
        const response = await fetch("/api/user/favorites", { cache: "no-store" })

        if (!response.ok) {
          throw new Error("No se pudieron cargar los favoritos")
        }

        const data = (await response.json()) as { recipes?: FavoriteRecipe[] }

        if (!active) {
          return
        }

        setRecipes(data.recipes || [])
      } catch (err) {
        if (!active) {
          return
        }

        setError(err instanceof Error ? err.message : "No se pudieron cargar los favoritos")
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadFavorites()

    return () => {
      active = false
    }
  }, [])

  const persistRecipe = (recipe: FavoriteRecipe) => {
    localStorage.setItem(recipe.id, JSON.stringify(recipe))
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
        <h1 className="text-2xl font-bold tracking-tight">Tus recetas favoritas</h1>
        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-tighter text-slate-500">
          {recipes.length} receta{recipes.length !== 1 ? "s" : ""}
        </span>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!error && recipes.length === 0 && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-8 text-center">
          <p className="text-slate-600">Aún no has guardado recetas en favoritos.</p>
          <Link
            href="/app"
            className="mt-4 inline-flex cursor-pointer items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Ir a generar recetas
          </Link>
        </div>
      )}

      {!error && recipes.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/app/receta/${recipe.id}`}
              onClick={() => persistRecipe(recipe)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 transition-all hover:border-primary/50"
            >
              <article>
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-6xl">🍽️</span>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex gap-2">
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-700">
                      {recipe.level}
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                      {recipe.time}
                    </span>
                  </div>
                  <h2 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-primary">
                    {recipe.title}
                  </h2>
                  <p className="line-clamp-2 text-sm text-slate-500">{recipe.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
