import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Job } from '../types'
import { useAuth } from './AuthContext'

interface JobState {
  jobs: Job[]
  addJob: (job: Omit<Job, 'id' | 'userId'>) => void
  updateJob: (job: Job) => void
  deleteJob: (id: string) => void
}

type Action =
  | { type: 'SET_JOBS'; jobs: Job[] }
  | { type: 'ADD_JOB'; job: Job }
  | { type: 'UPDATE_JOB'; job: Job }
  | { type: 'DELETE_JOB'; id: string }

const JobContext = createContext<JobState | null>(null)

function reducer(state: Job[], action: Action): Job[] {
  switch (action.type) {
    case 'SET_JOBS':
      return action.jobs
    case 'ADD_JOB':
      return [...state, action.job]
    case 'UPDATE_JOB':
      return state.map((j) => (j.id === action.job.id ? action.job : j))
    case 'DELETE_JOB':
      return state.filter((j) => j.id !== action.id)
    default:
      return state
  }
}

function storageKey(userId: string) {
  return `jt_jobs_${userId}`
}

export function JobProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [jobs, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    if (user) {
      const data = localStorage.getItem(storageKey(user.id))
      dispatch({ type: 'SET_JOBS', jobs: data ? JSON.parse(data) : [] })
    } else {
      dispatch({ type: 'SET_JOBS', jobs: [] })
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(storageKey(user.id), JSON.stringify(jobs))
    }
  }, [jobs, user])

  const addJob = (partial: Omit<Job, 'id' | 'userId'>) => {
    if (!user) return
    dispatch({
      type: 'ADD_JOB',
      job: { ...partial, id: crypto.randomUUID(), userId: user.id },
    })
  }

  const updateJob = (job: Job) => dispatch({ type: 'UPDATE_JOB', job })

  const deleteJob = (id: string) => dispatch({ type: 'DELETE_JOB', id })

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  )
}

export function useJobs() {
  const ctx = useContext(JobContext)
  if (!ctx) throw new Error('useJobs must be used within JobProvider')
  return ctx
}
