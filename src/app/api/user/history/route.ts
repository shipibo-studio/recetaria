import { neonAuth } from "@neondatabase/auth/next/server"
import { NextResponse } from "next/server"

import {
  createUserRecipeSearchHistoryEntry,
  ensureUserRecipeSearchHistoryTable,
  getUserRecipeSearchHistory,
  UserFavoriteRecipe,
} from "@/lib/db"

export const dynamic = "force-dynamic"

type HistoryRequestBody = {
  ingredients?: unknown
  skillLevel?: unknown
  servings?: unknown
  recipes?: unknown
}

function normalizeRecipes(input: unknown): UserFavoriteRecipe[] | null {
  if (!Array.isArray(input)) {
    return null
  }

  const recipes: UserFavoriteRecipe[] = []

  for (const item of input) {
    if (!item || typeof item !== "object") {
      return null
    }

    const recipe = item as Partial<UserFavoriteRecipe>

    if (
      typeof recipe.id !== "string" ||
      typeof recipe.title !== "string" ||
      typeof recipe.description !== "string" ||
      typeof recipe.level !== "string" ||
      typeof recipe.time !== "string" ||
      typeof recipe.servings !== "number" ||
      !Array.isArray(recipe.ingredients) ||
      !Array.isArray(recipe.instructions)
    ) {
      return null
    }

    recipes.push({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      level: recipe.level,
      time: recipe.time,
      servings: recipe.servings,
      ingredients: recipe.ingredients.filter((value): value is string => typeof value === "string"),
      instructions: recipe.instructions.filter((value): value is string => typeof value === "string"),
      image: typeof recipe.image === "string" ? recipe.image : undefined,
    })
  }

  return recipes
}

export async function GET() {
  const { user } = await neonAuth()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  await ensureUserRecipeSearchHistoryTable()
  const entries = await getUserRecipeSearchHistory(user.id)

  return NextResponse.json({ entries })
}

export async function POST(request: Request) {
  const { user } = await neonAuth()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as HistoryRequestBody

  const ingredients = typeof body.ingredients === "string" ? body.ingredients.trim() : ""
  const skillLevel = typeof body.skillLevel === "string" ? body.skillLevel.trim() : ""
  const servings = typeof body.servings === "number" ? body.servings : NaN
  const recipes = normalizeRecipes(body.recipes)

  if (!ingredients || !skillLevel || !Number.isFinite(servings) || !recipes || recipes.length === 0) {
    return NextResponse.json(
      { message: "Datos de historial inválidos" },
      { status: 400 }
    )
  }

  await ensureUserRecipeSearchHistoryTable()
  await createUserRecipeSearchHistoryEntry(user.id, {
    ingredients,
    skillLevel,
    servings,
    recipes,
  })

  return NextResponse.json({ ok: true })
}
