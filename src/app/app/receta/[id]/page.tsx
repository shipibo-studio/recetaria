"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface Recipe {
  title: string
  description: string
  level: string
  time: string
  servings: number
  ingredients: string[]
  instructions: string[]
  image?: string
}

// Por ahora usamos datos de ejemplo
// Más adelante esto se puede cargar desde localStorage, base de datos, etc.
const exampleRecipe: Recipe = {
  title: "Pomodoro clásico",
  description: "Una salsa italiana simple y auténtica, hecha con ajo fresco y albahaca.",
  level: "Fácil",
  time: "15 min",
  servings: 4,
  ingredients: [
    "500g de tomates maduros",
    "4 dientes de ajo",
    "1 manojo de albahaca fresca",
    "3 cucharadas de aceite de oliva virgen extra",
    "Sal al gusto",
    "Pimienta negra molida al gusto"
  ],
  instructions: [
    "Lava los tomates y córtalos en cubos pequeños.",
    "Pela y pica finamente el ajo.",
    "En una sartén grande, calienta el aceite de oliva a fuego medio.",
    "Agrega el ajo picado y sofríe durante 1 minuto hasta que esté fragante.",
    "Añade los tomates picados y cocina durante 10-12 minutos, removiendo ocasionalmente.",
    "Lava la albahaca, arranca las hojas y agrégalas a la salsa.",
    "Sazona con sal y pimienta al gusto.",
    "Sirve caliente sobre pasta recién cocida."
  ],
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_1hIVoaHstD63OjGI7VsPtbUIHyYqmSeCxdqaI7iXlhHwGuQ7hQCHaom9rVYzcoZ4iy8wT64XjVSDtKi_bj2jMxo1HbGcdK1iGg1XsJcqn3jTAo4nGk4jI78jL7dV3cUa7Dg5hJ4EXbmJki1gvBNC9xNMBTwdAvklo4MyiqMnL6CfZ8fyLLea5vzNpg2nCrWjWp03yLg_mYB0pxOcPzuSjZygSCzF_IVSfjOWUgAmfHW0BR-PbEe25uoHY73uISzM7rVTxLQnjMhB"
}

export default function RecipeDetailPage() {
  const router = useRouter()
  const recipe = exampleRecipe

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

        {/* Imagen de la receta */}
        {recipe.image && (
          <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

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
