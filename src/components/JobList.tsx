import { useState, useMemo } from 'react'
import { Plus, ExternalLink, Pencil, Trash2, ArrowUpDown } from 'lucide-react'
import { useJobs } from '../contexts/JobContext'
import { STATUS_COLORS, PRIORITY_COLORS, STATUS, STAGE } from '../data/dropdowns'
import { GlassCard } from './ui/GlassCard'
import { GlassButton } from './ui/GlassButton'
import { GlassSelect } from './ui/GlassSelect'

import { JobForm } from './JobForm'
import type { Job } from '../types'

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Data (mais recente)' },
  { value: 'date-asc', label: 'Data (mais antiga)' },
  { value: 'status', label: 'Status' },
  { value: 'stage', label: 'Etapa' },
  { value: 'priority', label: 'Prioridade' },
  { value: 'company', label: 'Empresa (A-Z)' },
] as const

const STATUS_ORDER = Object.fromEntries(STATUS.map((s, i) => [s, i]))
const STAGE_ORDER = Object.fromEntries(STAGE.map((s, i) => [s, i]))
const PRIORITY_ORDER = { Urgente: 0, Alta: 1, Média: 2, Baixa: 3 }

function sortJobs(jobs: Job[], sort: string): Job[] {
  const sorted = [...jobs]
  switch (sort) {
    case 'date-desc':
      return sorted.sort((a, b) => b.appliedDate.localeCompare(a.appliedDate))
    case 'date-asc':
      return sorted.sort((a, b) => a.appliedDate.localeCompare(b.appliedDate))
    case 'status':
      return sorted.sort((a, b) => (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99))
    case 'stage':
      return sorted.sort((a, b) => (STAGE_ORDER[a.stage] ?? 99) - (STAGE_ORDER[b.stage] ?? 99))
    case 'priority':
      return sorted.sort(
        (a, b) => ((PRIORITY_ORDER as any)[a.priority] ?? 99) - ((PRIORITY_ORDER as any)[b.priority] ?? 99)
      )
    case 'company':
      return sorted.sort((a, b) => a.company.localeCompare(b.company))
    default:
      return sorted
  }
}

export function JobList() {
  const { jobs, deleteJob } = useJobs()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Job | null>(null)
  const [sort, setSort] = useState('date-desc')

  const sorted = useMemo(() => sortJobs(jobs, sort), [jobs, sort])

  const openNew = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (job: Job) => {
    setEditing(job)
    setFormOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-white/40">{jobs.length} candidatura(s)</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/[0.05] backdrop-blur-md border border-white/[0.1] rounded-xl px-3 py-1.5">
            <ArrowUpDown size={13} className="text-white/40" />
            <GlassSelect
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="!bg-transparent !border-0 !rounded-none !px-0 !py-0 !ring-0 !shadow-none text-xs w-auto"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#1a1a2e]">
                  {opt.label}
                </option>
              ))}
            </GlassSelect>
          </div>
          <GlassButton onClick={openNew}>
            <span className="flex items-center gap-2">
              <Plus size={16} /> Nova Candidatura
            </span>
          </GlassButton>
        </div>
      </div>

      {jobs.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="text-white/30 text-sm">
            Nenhuma candidatura registrada. Crie a primeira!
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-2">
          {sorted.map((job) => (
            <GlassCard key={job.id} className="p-4" hover>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {job.company}
                    </h3>
                    <span className="text-xs text-white/30">·</span>
                    <span className="text-sm text-white/60 truncate">{job.role}</span>
                    {job.link && (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-purple-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_COLORS[job.status] || 'bg-white/10 text-white/50 border-white/10'}`}
                    >
                      {job.status}
                    </span>
                    <span className={`text-[10px] font-medium ${PRIORITY_COLORS[job.priority] || 'text-white/40'}`}>
                      {job.priority}
                    </span>
                    {job.location && (
                      <span className="text-[10px] text-white/30">
                        {job.location}{job.country ? `, ${job.country}` : ''}
                      </span>
                    )}

                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-white/25 mr-1">
                    {job.appliedDate}
                  </span>
                  <button
                    onClick={() => openEdit(job)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <JobForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        editing={editing}
      />
    </div>
  )
}
