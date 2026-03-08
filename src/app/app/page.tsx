"use client"

import { useMemo, useState } from "react"

import { recipeCards, skillLevels } from "./app.data"
import styles from "./app.module.css"

export default function AppPage() {
  const [selectedSkill, setSelectedSkill] = useState(skillLevels[0])

  const resultsLabel = useMemo(() => `${recipeCards.length + 1} resultados`, [])

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">¿Qué hay en tu cocina?</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Escribe tus ingredientes y deja que la IA te proponga tu próxima comida.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Ingredientes disponibles
            </label>
            <div className="relative">
              <textarea
                className="min-h-[140px] w-full resize-none rounded-lg border border-slate-200 bg-white p-5 text-lg outline-none transition-all placeholder:text-slate-300 focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-700"
                placeholder="Ej: tomate, albahaca, pasta, ajo, aceite de oliva..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Nivel de habilidad
              </label>
              <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
                {skillLevels.map((level) => {
                  const isActive = selectedSkill === level

                  return (
                    <button
                      key={level}
                      className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-white text-slate-900 shadow-sm dark:bg-primary dark:text-primary-foreground"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                      }`}
                      onClick={() => setSelectedSkill(level)}
                      type="button"
                    >
                      {level}
                    </button>
                  )
                })}
              </div>
            </div>

            <button className="flex h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90">
              <span>Generar recetas</span>
              <span>✨</span>
            </button>
          </div>
        </div>

        <div className="mt-24 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h3 className="text-xl font-bold">Recetas sugeridas</h3>
            <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-tighter text-slate-500 dark:bg-slate-800">
              {resultsLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recipeCards.map((card) => (
              <article
                key={card.title}
                className={`group cursor-pointer overflow-hidden rounded-xl border border-slate-200 transition-all hover:border-primary/50 dark:border-slate-800 ${styles.recipeCardShadow}`}
              >
                <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={card.image}
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex gap-2">
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {card.level}
                    </span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-500 dark:bg-slate-800">
                      {card.time}
                    </span>
                  </div>
                  <h4 className="text-lg mb-1 font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                    {card.title}
                  </h4>
                  <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{card.description}</p>
                </div>
              </article>
            ))}

            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
              <span className="mb-3 text-4xl">➕</span>
              <p className="text-sm">Procesando más combinaciones...</p>
            </div>
          </div>
        </div>
    </main>
  )
}
