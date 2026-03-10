"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { Loader } from "@/components/ui/loader"
import { Typewriter } from "@/components/ui/typewriter"

import { skillLevels } from "./app.data"
import styles from "./app.module.css"

const LOADING_PHRASES = [
  "La IA está creando recetas personalizadas para ti...",
  "Analizando las mejores combinaciones de ingredientes...",
  "Buscando recetas que se adapten a tu nivel de habilidad...",
  "Generando instrucciones paso a paso para cada receta...",
  "Calculando tiempos de preparación y niveles de dificultad...",
  "Seleccionando las recetas más deliciosas para ti...",
  "Optimizando las proporciones y técnicas culinarias..."
]

const SERVINGS_OPTIONS = [1, 2, 4]

interface AIRecipe {
  id: string
  title: string
  description: string
  level: string
  time: string
  servings: number
  ingredients: string[]
  instructions: string[]
}

export default function AppPage() {
  const [selectedSkill, setSelectedSkill] = useState(skillLevels[0])
  const [servings, setServings] = useState(1)
  const [ingredients, setIngredients] = useState("")
  const [aiRecipes, setAiRecipes] = useState<AIRecipe[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [hasGenerated, setHasGenerated] = useState(false)

  // Cargar recetas guardadas al montar el componente
  useState(() => {
    const savedRecipeIds = localStorage.getItem('current-recipe-ids')
    if (savedRecipeIds) {
      try {
        const ids = JSON.parse(savedRecipeIds) as string[]
        const loadedRecipes: AIRecipe[] = []
        
        ids.forEach(id => {
          const recipeData = localStorage.getItem(id)
          if (recipeData) {
            loadedRecipes.push(JSON.parse(recipeData))
          }
        })
        
        if (loadedRecipes.length > 0) {
          setAiRecipes(loadedRecipes)
          setHasGenerated(true)
        }
      } catch (error) {
        console.error('Error loading recipes:', error)
      }
    }
  })

  function handleBackToForm() {
    // Limpiar recetas de localStorage
    const savedRecipeIds = localStorage.getItem('current-recipe-ids')
    if (savedRecipeIds) {
      try {
        const ids = JSON.parse(savedRecipeIds) as string[]
        ids.forEach(id => localStorage.removeItem(id))
        localStorage.removeItem('current-recipe-ids')
      } catch (error) {
        console.error('Error clearing recipes:', error)
      }
    }
    
    setHasGenerated(false)
    setAiRecipes([])
    setError("")
  }

  async function handleGenerateRecipes(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    if (!ingredients.trim()) {
      setError("Por favor ingresa tus ingredientes")
      return
    }

    setError("")
    setIsGenerating(true)
    setHasGenerated(false)

    try {
      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredients.trim(),
          skillLevel: selectedSkill,
          servings: servings,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Error al generar recetas")
      }

      const data = await response.json()
      const timestamp = Date.now()
      
      // Añadir IDs únicos y guardar en localStorage
      const recipesWithIds = (data.recipes || []).map((recipe: Omit<AIRecipe, "id" | "servings">, index: number) => ({
        ...recipe,
        id: `recipe-${timestamp}-${index}`,
        servings: servings
      }))
      
      // Guardar en localStorage
      const recipeIds: string[] = []
      recipesWithIds.forEach((recipe: AIRecipe) => {
        localStorage.setItem(recipe.id, JSON.stringify(recipe))
        recipeIds.push(recipe.id)
      })
      
      // Guardar lista de IDs de recetas actuales
      localStorage.setItem('current-recipe-ids', JSON.stringify(recipeIds))
      
      setAiRecipes(recipesWithIds)
      setHasGenerated(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar recetas")
      setHasGenerated(false)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      {!hasGenerated && !isGenerating && (
        <>
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">¿Qué hay en tu cocina?</h1>
            <p className="text-lg text-slate-500">
              Escribe tus ingredientes y deja que la IA te proponga tu próxima comida.
            </p>
          </div>

          <form onSubmit={handleGenerateRecipes} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Ingredientes disponibles
              </label>
              <div className="relative">
                <input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white p-5 text-lg outline-none transition-all placeholder:text-slate-300 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Ej: tomate, albahaca, pasta, ajo, aceite de oliva..."
                  disabled={isGenerating}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Nivel de habilidad
                </label>
                <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1">
                  {skillLevels.map((level) => {
                    const isActive = selectedSkill === level

                    return (
                      <button
                        key={level}
                        className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                        onClick={() => setSelectedSkill(level)}
                        type="button"
                        disabled={isGenerating}
                      >
                        {level}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Comensales
                </label>
                <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1">
                  {SERVINGS_OPTIONS.map((option) => {
                    const isActive = servings === option

                    return (
                      <button
                        key={option}
                        className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                        onClick={() => setServings(option)}
                        type="button"
                        disabled={isGenerating}
                      >
                        {option} {option === 1 ? 'persona' : 'personas'}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 items-center justify-center gap-6">
              <button 
                type="submit"
                disabled={isGenerating}
                  className="flex h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed md:mx-auto md:w-[300px]"
              >
                {isGenerating ? (
                  <>
                    <span>Generando...</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  </>
                ) : (
                  <>
                    <span>Generar recetas</span>
                    <span>✨</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}
          </form>
        </>
      )}

      {isGenerating && (
        <div className="mt-24">
          <Loader />
          <Typewriter 
            phrases={LOADING_PHRASES}
            interval={10000}
            typingSpeed={50}
            className="mt-4 text-center text-sm text-slate-500"
          />
        </div>
      )}

      {!isGenerating && hasGenerated && (
        <div className="space-y-8">
          <button
            onClick={handleBackToForm}
            className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
          >
            <span>←</span>
            <span>Volver</span>
          </button>

        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold">Recetas generadas por IA</h3>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-tighter text-slate-500">
            {aiRecipes.length} resultado{aiRecipes.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {aiRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/app/receta/${recipe.id}`}
              className={`group cursor-pointer overflow-hidden rounded-xl border border-slate-200 transition-all hover:border-primary/50 ${styles.recipeCardShadow}`}
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
                  <h4 className="text-lg mb-1 font-bold text-slate-900 transition-colors group-hover:text-primary">
                    {recipe.title}
                  </h4>
                  <p className="line-clamp-2 text-sm text-slate-500">{recipe.description}</p>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Ingredientes principales
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.slice(0, 4).map((ing, i) => (
                        <span key={i} className="text-xs bg-slate-50 px-2 py-1 rounded text-slate-600">
                          {ing}
                        </span>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <span className="text-xs text-slate-400">
                          +{recipe.ingredients.length - 4} más
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      )}
    </main>
  )
}