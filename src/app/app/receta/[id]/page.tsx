"use client"

import { useMemo, useSyncExternalStore } from "react"
import { useParams, useRouter } from "next/navigation"

interface Recipe {
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

export default function RecipeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const recipeId = params.id as string
  const isClient = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  )

  const recipeJson = useSyncExternalStore(
    () => () => { },
    () => localStorage.getItem(recipeId),
    () => null
  )

  const recipe = useMemo<Recipe | null>(() => {
    if (!recipeJson) {
      return null
    }

    try {
      return JSON.parse(recipeJson) as Recipe
    } catch (error) {
      console.error("Error parsing recipe:", error)
      return null
    }
  }, [recipeJson])

  const loading = !isClient

  const handleBack = () => {
    router.push('/app')
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

  if (!recipe) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <button
          onClick={handleBack}
          className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
        >
          <span>←</span>
          <span>Volver</span>
        </button>
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-red-900">Receta no encontrada</h2>
          <p className="text-red-600">No se pudo cargar la información de esta receta.</p>
          <button
            onClick={handleBack}
            className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-white transition-opacity hover:opacity-90"
          >
            Volver a recetas
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <button
        onClick={() => router.back()}
        className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
      >
        <span>←</span>
        <span>Volver</span>
      </button>

      <article className="space-y-8">
        {/* Header de la receta */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{recipe.title}</h1>
          <p className="text-lg text-slate-500">{recipe.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Nivel:</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                {recipe.level}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">⏱️</span>
              <span className="font-medium text-slate-700">{recipe.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">👥</span>
              <span className="font-medium text-slate-700">
                {recipe.servings} {recipe.servings === 1 ? 'persona' : 'personas'}
              </span>
            </div>
          </div>
        </header>

        {/* Imagen de la receta o placeholder */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
          {recipe.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-full w-full object-cover"
              />
            </>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-9xl">🍽️</span>
            </div>
          )}
        </div>

        {/* Ingredientes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Ingredientes</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
                <span className="text-slate-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Modo de preparación */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Modo de preparación</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="pt-1 text-slate-700">{instruction}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-8">
          <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition-all hover:border-primary hover:text-primary">
            <span>🔖</span>
            <span>Guardar</span>
          </button>
          <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition-all hover:border-primary hover:text-primary">
            <span>📤</span>
            <span>Compartir</span>
          </button>
        </div>
      </article>
    </main>
  )
}
