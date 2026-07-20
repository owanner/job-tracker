export const STATUS = [
  'Applied',
  'In Review',
  'Interview',
  'Offer',
  'Rejected',
  'Withdrawn',
  'Ghosted',
] as const

export const PRIORITY = ['Baixa', 'Média', 'Alta', 'Urgente'] as const

export const PLATFORM = [
  'LinkedIn',
  'Glassdoor',
  'Indeed',
  'Gupy',
  'Catho',
  'InfoJobs',
  'Outro',
] as const

export const STAGE = [
  'Triagem',
  'Entrevista Técnica',
  'Entrevista RH',
  'Case/Desafio',
  'Proposta',
  'Contratado',
  'Rejeitado',
] as const

export const CURRENCIES = [
  'BRL',
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'Outro',
] as const

export const STATUS_COLORS: Record<string, string> = {
  Applied: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'In Review': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Interview: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Offer: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
  Withdrawn: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  Ghosted: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
}

export const PRIORITY_COLORS: Record<string, string> = {
  Baixa: 'text-gray-400',
  Média: 'text-blue-400',
  Alta: 'text-amber-400',
  Urgente: 'text-red-400',
}
