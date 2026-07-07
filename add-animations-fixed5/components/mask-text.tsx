"use client"

import { useEffect, useRef, useState, type ElementType } from "react"

/**
 * Révélation de titre "façon shader.se" : chaque mot monte depuis derrière un masque,
 * en cascade. Uniquement transform/opacity => composité par le GPU, zéro jank.
 */
export function MaskText({
  text,
  as: Tag = "span",
  className = "",
  wordDelay = 55,
  start = 0,
}: {
  text: string
  as?: ElementType
  className?: string
  wordDelay?: number
  start?: number
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = text.split(" ")

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={`mask-text ${visible ? "is-visible" : ""}`}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="mask-text-line">
              <span
                className="mask-text-word"
                style={{ transitionDelay: `${start + i * wordDelay}ms` }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </Tag>
  )
}
