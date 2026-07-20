import type { ReactNode } from 'react'

const glass = 'bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]'

export function GlassCard({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={`${glass} transition-all duration-300 ${hover ? 'hover:bg-white/[0.1] hover:border-white/[0.18] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:scale-[1.01] cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
