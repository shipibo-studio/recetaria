import { neon } from "@neondatabase/serverless"

function getSql() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL environment variable")
  }

  return neon(databaseUrl)
}

export type UserOpenRouterSettings = {
  apiKey: string
  model: string
}

export type UserFavoriteRecipe = {
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

export type UserRecipeSearchHistoryEntry = {
  id: number
  ingredients: string
  skillLevel: string
  servings: number
  recipes: UserFavoriteRecipe[]
  createdAt: string
}

export async function ensureUserOpenRouterSettingsTable() {
  const sql = getSql()

  await sql`
    CREATE TABLE IF NOT EXISTS user_openrouter_settings (
      user_id TEXT PRIMARY KEY,
      api_key TEXT NOT NULL DEFAULT '',
      model TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export async function getUserOpenRouterSettings(userId: string): Promise<UserOpenRouterSettings> {
  const sql = getSql()

  const rows = (await sql`
    SELECT api_key, model
    FROM user_openrouter_settings
    WHERE user_id = ${userId}
    LIMIT 1
  `) as {
    api_key: string
    model: string
  }[]

  const [row] = rows

  return {
    apiKey: row?.api_key ?? "",
    model: row?.model ?? "",
  }
}

export async function upsertUserOpenRouterSettings(userId: string, settings: UserOpenRouterSettings) {
  const sql = getSql()

  await sql`
    INSERT INTO user_openrouter_settings (user_id, api_key, model, updated_at)
    VALUES (${userId}, ${settings.apiKey}, ${settings.model}, NOW())
    ON CONFLICT (user_id)
    DO UPDATE SET
      api_key = EXCLUDED.api_key,
      model = EXCLUDED.model,
      updated_at = NOW()
  `
}

export async function ensureUserFavoriteRecipesTable() {
  const sql = getSql()

  await sql`
    CREATE TABLE IF NOT EXISTS user_favorite_recipes (
      user_id TEXT NOT NULL,
      recipe_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      level TEXT NOT NULL,
      time TEXT NOT NULL,
      servings INTEGER NOT NULL,
      ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
      instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
      image TEXT,
      saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, recipe_id)
    )
  `
}

export async function getUserFavoriteRecipes(userId: string): Promise<UserFavoriteRecipe[]> {
  const sql = getSql()

  const rows = (await sql`
    SELECT
      recipe_id,
      title,
      description,
      level,
      time,
      servings,
      ingredients,
      instructions,
      image
    FROM user_favorite_recipes
    WHERE user_id = ${userId}
    ORDER BY saved_at DESC
  `) as {
    recipe_id: string
    title: string
    description: string
    level: string
    time: string
    servings: number
    ingredients: string[]
    instructions: string[]
    image: string | null
  }[]

  return rows.map((row) => ({
    id: row.recipe_id,
    title: row.title,
    description: row.description,
    level: row.level,
    time: row.time,
    servings: row.servings,
    ingredients: row.ingredients,
    instructions: row.instructions,
    image: row.image ?? undefined,
  }))
}

export async function upsertUserFavoriteRecipe(userId: string, recipe: UserFavoriteRecipe) {
  const sql = getSql()

  await sql`
    INSERT INTO user_favorite_recipes (
      user_id,
      recipe_id,
      title,
      description,
      level,
      time,
      servings,
      ingredients,
      instructions,
      image,
      saved_at,
      updated_at
    )
    VALUES (
      ${userId},
      ${recipe.id},
      ${recipe.title},
      ${recipe.description},
      ${recipe.level},
      ${recipe.time},
      ${recipe.servings},
      ${JSON.stringify(recipe.ingredients)},
      ${JSON.stringify(recipe.instructions)},
      ${recipe.image ?? null},
      NOW(),
      NOW()
    )
    ON CONFLICT (user_id, recipe_id)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      level = EXCLUDED.level,
      time = EXCLUDED.time,
      servings = EXCLUDED.servings,
      ingredients = EXCLUDED.ingredients,
      instructions = EXCLUDED.instructions,
      image = EXCLUDED.image,
      updated_at = NOW()
  `
}

export async function ensureUserRecipeSearchHistoryTable() {
  const sql = getSql()

  await sql`
    CREATE TABLE IF NOT EXISTS user_recipe_search_history (
      id BIGSERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      skill_level TEXT NOT NULL,
      servings INTEGER NOT NULL,
      recipes JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export async function createUserRecipeSearchHistoryEntry(
  userId: string,
  entry: Omit<UserRecipeSearchHistoryEntry, "id" | "createdAt">
) {
  const sql = getSql()

  await sql`
    INSERT INTO user_recipe_search_history (
      user_id,
      ingredients,
      skill_level,
      servings,
      recipes,
      created_at
    )
    VALUES (
      ${userId},
      ${entry.ingredients},
      ${entry.skillLevel},
      ${entry.servings},
      ${JSON.stringify(entry.recipes)},
      NOW()
    )
  `
}

export async function getUserRecipeSearchHistory(
  userId: string,
  limit = 20
): Promise<UserRecipeSearchHistoryEntry[]> {
  const sql = getSql()

  const rows = (await sql`
    SELECT
      id,
      ingredients,
      skill_level,
      servings,
      recipes,
      created_at
    FROM user_recipe_search_history
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `) as {
    id: number
    ingredients: string
    skill_level: string
    servings: number
    recipes: UserFavoriteRecipe[]
    created_at: string
  }[]

  return rows.map((row) => ({
    id: row.id,
    ingredients: row.ingredients,
    skillLevel: row.skill_level,
    servings: row.servings,
    recipes: row.recipes,
    createdAt: row.created_at,
  }))
}