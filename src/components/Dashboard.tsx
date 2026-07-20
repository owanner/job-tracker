import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Briefcase, Send, CalendarDays, Gift, XCircle } from 'lucide-react'
import { useJobs } from '../contexts/JobContext'
import { GlassCard } from './ui/GlassCard'

const STAT_CONFIG = [
  { key: 'total', label: 'Total', icon: Briefcase, color: 'from-white/20 to-white/5' },
  { key: 'Applied', label: 'Aplicadas', icon: Send, color: 'from-blue-500/30 to-blue-500/5' },
  { key: 'Interview', label: 'Entrevistas', icon: CalendarDays, color: 'from-amber-500/30 to-amber-500/5' },
  { key: 'Offer', label: 'Ofertas', icon: Gift, color: 'from-emerald-500/30 to-emerald-500/5' },
  { key: 'Rejected', label: 'Rejeições', icon: XCircle, color: 'from-red-500/30 to-red-500/5' },
] as const

const PIE_COLORS = ['#3b82f6', '#eab308', '#f59e0b', '#10b981', '#ef4444', '#a855f7', '#6b7280']

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/[0.1] backdrop-blur-xl border border-white/[0.15] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-white text-sm font-medium">{payload[0].name}</p>
      <p className="text-white/60 text-xs">{payload[0].value} vaga(s)</p>
    </div>
  )
}

export function Dashboard() {
  const { jobs } = useJobs()

  const stats = useMemo(() => {
    const count = (s: string) => jobs.filter((j) => j.status === s).length
    return {
      total: jobs.length,
      Applied: count('Applied'),
      Interview: count('Interview'),
      Offer: count('Offer'),
      Rejected: count('Rejected'),
    }
  }, [jobs])

  const pieData = useMemo(() => {
    const map = new Map<string, number>()
    jobs.forEach((j) => map.set(j.status, (map.get(j.status) || 0) + 1))
    return Array.from(map, ([name, value]) => ({ name, value }))
  }, [jobs])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {STAT_CONFIG.map((s) => {
          const val = s.key === 'total' ? stats.total : stats[s.key as keyof typeof stats]
          return (
            <GlassCard key={s.key} className="p-4" hover>
              <div className={`flex items-center gap-3 mb-2`}>
                <div className={`p-2 rounded-xl bg-gradient-to-br ${s.color}`}>
                  <s.icon size={16} className="text-white/80" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{val}</p>
              <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            </GlassCard>
          )
        })}
      </div>

      <GlassCard className="p-6">
        <h3 className="text-sm font-semibold text-white/60 mb-4">
          Distribuição por Status
        </h3>
        {pieData.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-12">
            Nenhuma candidatura ainda
          </p>
        ) : (
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}
                  formatter={(value: string) => (
                    <span className="text-white/60">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
