import { NextResponse } from "next/server"

const STATICFORMS_URL = "https://api.staticforms.dev/submit"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const honeypot = String(formData.get("honeypot") ?? "").trim()

    // If honeypot is filled, treat as bot but pretend success.
    if (honeypot) {
      return NextResponse.json({ ok: true, message: "Gracias, te agregamos a la lista de espera." })
    }

    const email = String(formData.get("email") ?? "").trim()
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Ingresa un correo valido." },
        { status: 400 }
      )
    }

    const apiKey =
      process.env.STATICFORMS_API_KEY?.trim() ??
      process.env.STATICFORMS_ACCESS_KEY?.trim()

    if (!apiKey) {
      console.error("Missing STATICFORMS_API_KEY or STATICFORMS_ACCESS_KEY environment variable")
      return NextResponse.json(
        { ok: false, message: "Falta configurar STATICFORMS_API_KEY en el servidor." },
        { status: 500 }
      )
    }

    const payload = new URLSearchParams({
      apiKey,
      email,
      subject: "Nueva suscripcion lista de espera - RecetarIA",
      message: `Nuevo email para lista de espera: ${email}`,
      replyTo: email,
    })

    const response = await fetch(STATICFORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    })

    const rawBody = await response.text()
    let data: { success?: boolean; message?: string } = {}
    try {
      data = JSON.parse(rawBody || "{}") as { success?: boolean; message?: string }
    } catch {
      data = { message: rawBody }
    }

    if (!response.ok || data.success !== true) {
      console.error("StaticForms error", { status: response.status, data })
      return NextResponse.json(
        { ok: false, message: data.message || "No pudimos registrar tu correo. Intenta nuevamente." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, message: "Gracias, te agregamos a la lista de espera." })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { ok: false, message: "No pudimos registrar tu correo. Intenta nuevamente." },
      { status: 500 }
    )
  }
}
