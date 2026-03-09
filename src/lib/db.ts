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