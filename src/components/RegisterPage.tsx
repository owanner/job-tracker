import { useState, type FormEvent } from 'react'
import { GlassInput } from './ui/GlassInput'
import { GlassButton } from './ui/GlassButton'
import { GlassCard } from './ui/GlassCard'
import { Briefcase } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface AuthPageProps {
  onToggle: () => void
}

export function RegisterPage({ onToggle }: AuthPageProps) {
  const { register } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget as HTMLFormElement)
    const name = fd.get('name') as string
    const email = fd.get('email') as string
    const password = fd.get('password') as string
    const confirm = fd.get('confirm') as string

    if (password !== confirm) {
      setError('As senhas não coincidem')
      return
    }

    const ok = register(name, email, password)
    if (!ok) setError('Email já cadastrado')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 mb-4">
            <Briefcase size={28} className="text-white/80" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            JobTracker
          </h1>
          <p className="text-sm text-white/40 mt-1">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/50 mb-1">Nome</label>
            <GlassInput name="name" required placeholder="Seu nome" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Email</label>
            <GlassInput name="email" type="email" required placeholder="seu@email.com" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Senha</label>
            <GlassInput name="password" type="password" required placeholder="••••••" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Confirmar Senha</label>
            <GlassInput name="confirm" type="password" required placeholder="••••••" />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center bg-red-500/10 py-2 rounded-lg">
              {error}
            </p>
          )}

          <GlassButton type="submit" className="w-full">
            Criar Conta
          </GlassButton>
        </form>

        <p className="text-center text-xs text-white/30 mt-6">
          Já tem conta?{' '}
          <button onClick={onToggle} className="text-purple-400 hover:text-purple-300 transition-colors">
            Fazer login
          </button>
        </p>
      </GlassCard>
    </div>
  )
}
