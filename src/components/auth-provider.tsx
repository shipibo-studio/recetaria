"use client"

import { NeonAuthUIProvider } from "@neondatabase/auth/react/ui"
import { ReactNode, useEffect } from "react"

import { authClient } from "@/lib/auth-client"
import { esLocalization } from "@/lib/auth-localization"

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    // Force light mode
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = 'light'
  }, [])

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      redirectTo="/app"
      localization={esLocalization}
    >
      {children}
    </NeonAuthUIProvider>
  )
}