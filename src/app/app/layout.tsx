import { ReactNode } from "react"

import { AppFooter } from "./components/app-footer"
import { AppHeader } from "./components/app-header"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[max(884px,100dvh)]">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  )
}
