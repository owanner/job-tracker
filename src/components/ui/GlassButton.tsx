import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary:
    'bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/25',
  secondary:
    'bg-white/[0.08] hover:bg-white/[0.14] text-white/80 hover:text-white border border-white/[0.12]',
  danger:
    'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/20',
}

export function GlassButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  children: ReactNode
}) {
  return (
    <button
      className={`px-5 py-2.5 rounded-xl font-medium text-sm backdrop-blur-md transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
