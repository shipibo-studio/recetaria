"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { authClient } from "@/lib/auth-client"
import { appDesktopNav } from "../app.data"

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link className="flex items-center gap-2" href="/app">
          <div className="flex items-center justify-center rounded bg-primary p-1.5 text-primary-foreground">
            <span className="text-[20px]">🍳</span>
          </div>
          <span className="text-lg font-bold tracking-tight">RecetarIA</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-500 md:flex">
          {appDesktopNav.map((item) => {
            const isActive = item.href !== "#" && pathname === item.href

            return (
              <Link
                key={item.label}
                className={`transition-colors hover:text-primary ${
                  isActive ? "text-primary" : ""
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            )
          })}
          {mounted && (
            <button
              onClick={handleSignOut}
              title="Cerrar sesión"
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="text-sm">Cerrar sesión</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
