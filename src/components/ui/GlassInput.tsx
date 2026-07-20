import { forwardRef, type InputHTMLAttributes } from 'react'

export const GlassInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-2.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.12] rounded-xl text-white placeholder-white/40 outline-none transition-all duration-200 focus:border-purple-400/50 focus:bg-white/[0.09] focus:ring-2 focus:ring-purple-400/20 text-sm ${className}`}
      {...props}
    />
  )
})

GlassInput.displayName = 'GlassInput'
