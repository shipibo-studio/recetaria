import { neonAuth } from "@neondatabase/auth/next/server"
import { NextResponse } from "next/server"

import {
  ensureUserOpenRouterSettingsTable,
  getUserOpenRouterSettings,
} from "@/lib/db"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const { user } = await neonAuth()

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json()) as {
      ingredients?: string
      skillLevel?: string
      servings?: number
    }

    const ingredients = typeof body.ingredients === "string" ? body.ingredients.trim() : ""
    const skillLevel = typeof body.skillLevel === "string" ? body.skillLevel.trim() : "Principiante"
    const servings = typeof body.servings === "number" ? body.servings : 1

    if (!ingredients) {
      return NextResponse.json(
        { message: "Se requieren ingredientes" },
        { status: 400 }
      )
    }

    // Obtener configuración de OpenRouter del usuario
    await ensureUserOpenRouterSettingsTable()
    const settings = await getUserOpenRouterSettings(user.id)

    if (!settings.apiKey || !settings.model) {
      return NextResponse.json(
        { message: "Configura tu API Key y modelo de OpenRouter en Ajustes" },
        { status: 400 }
      )
    }

    // Construir prompt para OpenRouter
    const prompt = `Eres un chef profesional experto. Genera exactamente 3 recetas diferentes basadas en los siguientes ingredientes disponibles: ${ingredients}

El nivel de habilidad del usuario es: ${skillLevel}
Cantidad de comensales: ${servings} ${servings === 1 ? 'persona' : 'personas'}

Requisitos:
- Ajusta la complejidad de las recetas al nivel de habilidad indicado
- Ajusta las cantidades de ingredientes para ${servings} ${servings === 1 ? 'persona' : 'personas'}
- Usa principalmente los ingredientes proporcionados
- Puedes sugerir ingredientes complementarios básicos (sal, pimienta, aceite, etc.)
- Cada receta debe ser diferente y variada
- Especifica las cantidades de ingredientes de forma precisa para ${servings} ${servings === 1 ? 'persona' : 'personas'}

Responde ÚNICAMENTE con un JSON válido en el siguiente formato (sin texto adicional):
{
  "recipes": [
    {
      "title": "Nombre de la receta",
      "description": "Breve descripción de la receta en 1-2 líneas",
      "level": "${skillLevel}",
      "time": "hasta 60 mins",
      "ingredients": ["200g ingrediente 1", "1 unidad ingrediente 2"],
      "instructions": ["paso 1", "paso 2", "paso 3"]
    }
  ]
}`

    // Llamar a OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${settings.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "RecetarIA",
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("OpenRouter error:", errorData)
      return NextResponse.json(
        { message: "Error al generar recetas con IA" },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { message: "No se recibió respuesta de la IA" },
        { status: 500 }
      )
    }

    // Parsear respuesta JSON
    let parsedResponse
    try {
      // Limpiar el contenido por si tiene markdown
      const cleanContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
      parsedResponse = JSON.parse(cleanContent)
    } catch (error) {
      console.error("Error parsing AI response:", error)
      return NextResponse.json(
        { message: "Error al procesar la respuesta de la IA" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      recipes: parsedResponse.recipes || [],
    })
  } catch (error) {
    console.error("Error generating recipes:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
