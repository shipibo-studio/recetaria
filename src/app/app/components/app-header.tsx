"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { appDesktopNav } from "../app.data"

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background/80">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link className="flex items-center gap-2" href="/app">
          <div className="flex items-center justify-center rounded bg-primary p-1.5 text-primary-foreground">
            <span className="text-[20px]">🍳</span>
          </div>
          <span className="text-lg font-bold tracking-tight">RecetarIA</span>
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-slate-500 dark:text-slate-400 md:flex">
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
        </nav>
      </div>
    </header>
  )
}
