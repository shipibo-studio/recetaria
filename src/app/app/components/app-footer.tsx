"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { appMobileNav } from "../app.data"

export function AppFooter() {
  const pathname = usePathname()

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-100 bg-white px-6 py-3 dark:border-slate-800 dark:bg-background md:hidden">
        {appMobileNav.map((item) => {
          const isActive = item.href !== "#" && pathname === item.href

          return (
            <Link
              key={item.label}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-primary" : "text-slate-400 dark:text-slate-500"
              }`}
              href={item.href}
            >
              <span>{item.icon}</span>
              <span className="text-[10px] font-medium uppercase tracking-widest">{item.label}</span>
            </Link>
          )
        })}
      </div>

      <footer
        className="mx-auto mt-20 mb-20 max-w-4xl border-t border-slate-50 px-6 py-12 text-center text-sm text-slate-400 dark:border-slate-900 dark:text-slate-600 md:mb-0"
        style={{ fontFamily: "var(--font-andada-pro), serif" }}
      >
        <p>© 2026 RecetarIA v0.2.0. Construido con minimalismo en mente.</p>
      </footer>
    </>
  )
}
