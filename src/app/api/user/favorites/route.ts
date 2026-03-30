import { neonAuth } from "@neondatabase/auth/next/server"
import { NextResponse } from "next/server"

import {
  ensureUserFavoriteRecipesTable,
  getUserFavoriteRecipes,
  upsertUserFavoriteRecipe,
  UserFavoriteRecipe,
} from "@/lib/db"

export const dynamic = "force-dynamic"

function normalizeRecipe(input: unknown): UserFavoriteRecipe | null {
  if (!input || typeof input !== "object") {
    return null
  }

  const data = input as Partial<UserFavoriteRecipe>

  if (
    typeof data.id !== "string" ||
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    typeof data.level !== "string" ||
    typeof data.time !== "string" ||
    typeof data.servings !== "number" ||
    !Array.isArray(data.ingredients) ||
    !Array.isArray(data.instructions)
  ) {
    return null
  }

  const ingredients = data.ingredients.filter((item): item is string => typeof item === "string")
  const instructions = data.instructions.filter((item): item is string => typeof item === "string")

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    level: data.level,
    time: data.time,
    servings: data.servings,
    ingredients,
    instructions,
    image: typeof data.image === "string" ? data.image : undefined,
  }
}

export async function GET() {
  const { user } = await neonAuth()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  await ensureUserFavoriteRecipesTable()
  const recipes = await getUserFavoriteRecipes(user.id)

  return NextResponse.json({ recipes })
}

export async function POST(request: Request) {
  const { user } = await neonAuth()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as { recipe?: unknown }
  const recipe = normalizeRecipe(body.recipe)

  if (!recipe) {
    return NextResponse.json({ message: "Datos de receta inválidos" }, { status: 400 })
  }

  await ensureUserFavoriteRecipesTable()
  await upsertUserFavoriteRecipe(user.id, recipe)

  return NextResponse.json({ ok: true })
}
