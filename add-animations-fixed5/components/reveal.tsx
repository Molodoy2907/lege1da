"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type Variant = "up" | "left" | "right" | "scale" | "fade"

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode
  delay?: number
  variant?: Variant
  className?: string
  as?: "div" | "li" | "section"
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      // @ts-expect-error dynamic ref for union of elements
      ref={ref}
      data-reveal={variant}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
