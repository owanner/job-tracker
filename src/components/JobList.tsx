import { useState } from 'react'
import { Plus, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { useJobs } from '../contexts/JobContext'
import { STATUS_COLORS, PRIORITY_COLORS } from '../data/dropdowns'
import { GlassCard } from './ui/GlassCard'
import { GlassButton } from './ui/GlassButton'

import { JobForm } from './JobForm'
import type { Job } from '../types'

export function JobList() {
  const { jobs, deleteJob } = useJobs()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Job | null>(null)

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
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/40">{jobs.length} candidatura(s)</p>
        <GlassButton onClick={openNew}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> Nova Candidatura
          </span>
        </GlassButton>
      </div>

      {jobs.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="text-white/30 text-sm">
            Nenhuma candidatura registrada. Crie a primeira!
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-2">
          {jobs.map((job) => (
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
