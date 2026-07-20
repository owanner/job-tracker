import { useEffect } from 'react'
import { Modal } from './ui/Modal'
import { GlassInput } from './ui/GlassInput'
import { GlassSelect } from './ui/GlassSelect'
import { GlassButton } from './ui/GlassButton'

import { useJobs } from '../contexts/JobContext'
import { STATUS, PRIORITY, PLATFORM, STAGE, CURRENCIES } from '../data/dropdowns'
import type { Job } from '../types'

function selectOptions(arr: readonly string[]) {
  return arr.map((v) => (
    <option key={v} value={v}>
      {v}
    </option>
  ))
}

interface JobFormProps {
  open: boolean
  onClose: () => void
  editing: Job | null
}

export function JobForm({ open, onClose, editing }: JobFormProps) {
  const { addJob, updateJob } = useJobs()

  useEffect(() => {
    if (open && !editing) {
      const form = document.getElementById('job-form') as HTMLFormElement
      form?.reset()
      ;(form as any).matchScore.value = 3
    }
  }, [open, editing])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = {
      company: fd.get('company') as string,
      role: fd.get('role') as string,
      location: fd.get('location') as string,
      country: fd.get('country') as string,
      link: fd.get('link') as string,
      platform: fd.get('platform') as string,
      appliedDate: fd.get('appliedDate') as string,
      status: fd.get('status') as string,
      salary: fd.get('salary') as string,
      currency: fd.get('currency') as string,
      recruiter: fd.get('recruiter') as string,
      contact: fd.get('contact') as string,
      lastUpdate: fd.get('lastUpdate') as string,
      nextAction: fd.get('nextAction') as string,
      nextActionDate: fd.get('nextActionDate') as string,
      priority: fd.get('priority') as string,
      stage: fd.get('stage') as string,
      notes: fd.get('notes') as string,
      result: fd.get('result') as string,
    }

    if (editing) {
      updateJob({ ...data, id: editing.id, userId: editing.userId })
    } else {
      addJob(data)
    }
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? 'Editar Candidatura' : 'Nova Candidatura'}
    >
      <form id="job-form" onSubmit={handleSubmit} className="space-y-5">
        <Section title="Dados da Vaga">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Empresa *">
              <GlassInput name="company" required defaultValue={editing?.company} placeholder="Ex: Google" />
            </Field>
            <Field label="Cargo *">
              <GlassInput name="role" required defaultValue={editing?.role} placeholder="Ex: Frontend Developer" />
            </Field>
            <Field label="Local">
              <GlassInput name="location" defaultValue={editing?.location} placeholder="Ex: São Paulo" />
            </Field>
            <Field label="País">
              <GlassInput name="country" defaultValue={editing?.country} placeholder="Ex: Brasil" />
            </Field>
            <Field label="Link da Vaga">
              <GlassInput name="link" type="url" defaultValue={editing?.link} placeholder="https://..." />
            </Field>
            <Field label="Plataforma">
              <GlassSelect name="platform" defaultValue={editing?.platform}>
                {selectOptions(PLATFORM)}
              </GlassSelect>
            </Field>
            <Field label="Data da Candidatura">
              <GlassInput name="appliedDate" type="date" defaultValue={editing?.appliedDate} />
            </Field>
            <Field label="Status">
              <GlassSelect name="status" defaultValue={editing?.status}>
                {selectOptions(STATUS)}
              </GlassSelect>
            </Field>
          </div>
        </Section>

        <Section title="Salário">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Salário">
              <GlassInput name="salary" defaultValue={editing?.salary} placeholder="Ex: 5000" />
            </Field>
            <Field label="Moeda">
              <GlassSelect name="currency" defaultValue={editing?.currency}>
                {selectOptions(CURRENCIES)}
              </GlassSelect>
            </Field>
          </div>
        </Section>

        <Section title="Contato">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Recruiter">
              <GlassInput name="recruiter" defaultValue={editing?.recruiter} placeholder="Nome do recruiter" />
            </Field>
            <Field label="Contato">
              <GlassInput name="contact" defaultValue={editing?.contact} placeholder="Email /Telefone" />
            </Field>
          </div>
        </Section>

        <Section title="Acompanhamento">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Última Atualização">
              <GlassInput name="lastUpdate" type="date" defaultValue={editing?.lastUpdate} />
            </Field>
            <Field label="Etapa Atual">
              <GlassSelect name="stage" defaultValue={editing?.stage}>
                {selectOptions(STAGE)}
              </GlassSelect>
            </Field>
            <Field label="Prioridade">
              <GlassSelect name="priority" defaultValue={editing?.priority}>
                {selectOptions(PRIORITY)}
              </GlassSelect>
            </Field>
            <Field label="Próxima Ação">
              <GlassInput name="nextAction" defaultValue={editing?.nextAction} placeholder="Ex: Enviar portfólio" />
            </Field>
            <Field label="Data da Próxima Ação">
              <GlassInput name="nextActionDate" type="date" defaultValue={editing?.nextActionDate} />
            </Field>
            <Field label="Resultado">
              <GlassInput name="result" defaultValue={editing?.result} placeholder="Resultado final" />
            </Field>
          </div>
        </Section>

        <Section title="Observações">
          <textarea
            name="notes"
            rows={3}
            defaultValue={editing?.notes}
            placeholder="Anotações adicionais..."
            className="w-full px-4 py-2.5 bg-white/[0.06] backdrop-blur-md border border-white/[0.12] rounded-xl text-white placeholder-white/40 outline-none transition-all duration-200 focus:border-purple-400/50 focus:bg-white/[0.09] focus:ring-2 focus:ring-purple-400/20 text-sm resize-none"
          />
        </Section>

        <div className="flex justify-end gap-3 pt-2">
          <GlassButton type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </GlassButton>
          <GlassButton type="submit">
            {editing ? 'Salvar' : 'Criar'}
          </GlassButton>
        </div>
      </form>
    </Modal>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1">{label}</label>
      {children}
    </div>
  )
}
