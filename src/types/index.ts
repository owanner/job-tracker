export interface User {
  id: string
  name: string
  email: string
  password: string
}

export interface Job {
  id: string
  userId: string
  company: string
  role: string
  location: string
  country: string
  link: string
  platform: string
  appliedDate: string
  status: string
  salary: string
  currency: string
  recruiter: string
  contact: string
  lastUpdate: string
  nextAction: string
  nextActionDate: string
  priority: string
  stage: string
  matchScore: number
  notes: string
  result: string
}
