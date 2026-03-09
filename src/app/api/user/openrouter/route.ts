import { neonAuth } from "@neondatabase/auth/next/server"
import { NextResponse } from "next/server"

import {
  ensureUserOpenRouterSettingsTable,
  getUserOpenRouterSettings,
  upsertUserOpenRouterSettings,
} from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  const { user } = await neonAuth()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  await ensureUserOpenRouterSettingsTable()
  const settings = await getUserOpenRouterSettings(user.id)

  return NextResponse.json(settings)
}

export async function POST(request: Request) {
  const { user } = await neonAuth()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as {
    apiKey?: unknown
    model?: unknown
  }

  const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : ""
  const model = typeof body.model === "string" ? body.model.trim() : ""

  await ensureUserOpenRouterSettingsTable()
  await upsertUserOpenRouterSettings(user.id, { apiKey, model })

  return NextResponse.json({ ok: true })
}