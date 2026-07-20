import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthState {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

const USERS_KEY = 'jt_users'
const SESSION_KEY = 'jt_session'

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [user])

  const login = (email: string, password: string): boolean => {
    const found = getUsers().find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      setUser(found)
      return true
    }
    return false
  }

  const register = (name: string, email: string, password: string): boolean => {
    const users = getUsers()
    if (users.some((u) => u.email === email)) return false
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    }
    users.push(newUser)
    saveUsers(users)
    setUser(newUser)
    return true
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
