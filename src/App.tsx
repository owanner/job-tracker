import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { JobProvider } from './contexts/JobContext'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { JobList } from './components/JobList'
import { LoginPage } from './components/LoginPage'
import { RegisterPage } from './components/RegisterPage'

function AppInner() {
  const { user } = useAuth()
  const [authView, setAuthView] = useState<'login' | 'register'>('login')
  const [page, setPage] = useState<'dashboard' | 'jobs'>('dashboard')

  if (!user) {
    return authView === 'login' ? (
      <LoginPage onToggle={() => setAuthView('register')} />
    ) : (
      <RegisterPage onToggle={() => setAuthView('login')} />
    )
  }

  return (
    <JobProvider>
      <Layout page={page} setPage={setPage}>
        {page === 'dashboard' ? <Dashboard /> : <JobList />}
      </Layout>
    </JobProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}
