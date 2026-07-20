import { forwardRef, type SelectHTMLAttributes } from 'react'

export const GlassSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className = '', children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`w-full px-4 py-2.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.12] rounded-xl text-white outline-none transition-all duration-200 focus:border-purple-400/50 focus:bg-white/[0.09] focus:ring-2 focus:ring-purple-400/20 text-sm appearance-none cursor-pointer ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
      }}
      {...props}
    >
      {children}
    </select>
  )
})

GlassSelect.displayName = 'GlassSelect'
