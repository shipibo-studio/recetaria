"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  phrases: string[]
  interval?: number
  typingSpeed?: number
  className?: string
}

export function Typewriter({ 
  phrases, 
  interval = 3000, 
  typingSpeed = 30,
  className = ""
}: TypewriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Efecto para la animación de typewriter
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    
    if (isTyping) {
      if (displayedText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 0)
        return () => clearTimeout(timeout)
      }
    }
  }, [displayedText, isTyping, currentPhraseIndex, phrases, typingSpeed])

  // Efecto para cambiar de frase
  useEffect(() => {
    if (!isTyping) {
      const timeout = setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setDisplayedText("")
        setIsTyping(true)
      }, interval)
      return () => clearTimeout(timeout)
    }
  }, [isTyping, interval, phrases.length])

  return (
    <p className={className}>
      {displayedText}
      <span className="inline-block w-0.5 h-5 bg-current ml-1 animate-pulse" />
    </p>
  )
}
