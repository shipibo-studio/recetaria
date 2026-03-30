import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { WaitlistForm } from "./components/waitlist-form"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://recetaria-six.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "RecetarIA | Recetas con IA según tus ingredientes",
  description:
    "Descubre recetas personalizadas con IA usando los ingredientes que ya tienes en casa. Ajusta nivel, comensales y guarda tus favoritas.",
  keywords: [
    "recetas con IA",
    "generador de recetas",
    "recetas por ingredientes",
    "cocina inteligente",
    "recetas personalizadas",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RecetarIA | Recetas con IA según tus ingredientes",
    description:
      "Genera recetas personalizadas con IA, guarda favoritos y consulta historial de búsquedas en un solo lugar.",
    url: "/",
    siteName: "RecetarIA",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/social.jpg",
        width: 1200,
        height: 630,
        alt: "RecetarIA — Recetas con IA según tus ingredientes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecetarIA | Recetas con IA según tus ingredientes",
    description:
      "Genera recetas con IA usando ingredientes reales de tu cocina y ajusta por nivel y comensales.",
    images: ["/social.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "RecetarIA",
        url: SITE_URL,
        inLanguage: "es",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/app`,
          "query-input": "required name=ingredients",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "RecetarIA",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description:
          "Aplicación web para generar recetas con IA según ingredientes disponibles, nivel de habilidad y cantidad de comensales.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-xl">restaurant_menu</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">RecetarIA</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all">
                Beta Privado
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-8 text-left">
                <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                  Próximamente
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                  Cocina con <span className="text-primary">Inteligencia</span>
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                  ¿Qué hay en tu cocina? Ingresa tus ingredientes y deja que la IA diseñe tu próxima comida de forma personalizada y deliciosa.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square w-full rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-4 ring-1 ring-slate-200">
                  <div className="h-full w-full overflow-hidden rounded-2xl bg-white shadow-2xl relative">
                    <Image 
                      className="object-cover opacity-90 transition-opacity hover:opacity-100" 
                      alt="Modern high-end kitchen with fresh vegetables on counter" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrUDbmLKIjuB8ksmCAfH0jJdETh9bpfjqmvBHOBDTpeCrYClrexRbFIPX_2rnKB1vjL9UFgNUui1pQzbosPuGXzB2MKoj0aHXJeeKbW5zm0TXZ1jmdMia7TpsweqGf7r2qgI25jv3Fgd1rJlWvhVQRxX4tNX2mVh54Gij0O7u-4LmVq2UlwiiEeMjhowBKXTvsBQhygXzV9tiOgSrtrIcJWge3EzeU2PJvRd4zoCj45YxVf5E1Oap6N2c00YGKsmcU6MQ-XNXhje_F"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <span className="material-symbols-outlined">auto_awesome</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Receta sugerida</p>
                    <p className="text-sm font-bold text-slate-900">Pasta al Pesto Genovese</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-base font-bold tracking-widest text-primary uppercase">Beneficios</h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Lleva tu cocina al siguiente nivel</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group relative flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">person_pin</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Recetas Personalizadas</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">Platos adaptados exactamente a tus gustos, alergias y necesidades dietéticas específicas.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="group relative flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Ahorro de Tiempo</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">No más vueltas pensando qué cocinar; obtén ideas instantáneas con lo que ya tienes en casa.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="group relative flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">skillet</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Nivel de Chef Ajustable</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">Desde principiante hasta experto, ajustamos la complejidad de los pasos por ti.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waiting List / Pre-registro Section */}
        <section id="waitlist" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-20 text-center shadow-2xl">
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Únete a la lista de espera</h2>
                <p className="mt-6 text-lg text-slate-300">
                  Sé el primero en probar la revolución culinaria. Ingresa tu correo y te notificaremos cuando estemos listos para cocinar contigo.
                </p>
                <WaitlistForm />
              </div>
              {/* Background blobs */}
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary opacity-20 blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white">
                <span className="material-symbols-outlined text-[14px]">restaurant_menu</span>
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900">RecetarIA</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 RecetarIA. Hecho con ❤️ para amantes de la cocina.
            </p>
            <div className="flex gap-6">
              <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a className="text-slate-400 hover:text-primary transition-colors" href="#">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

