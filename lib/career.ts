import 'server-only'
import careerData from '@/content/career.json'

export interface CareerEntry {
  period: string
  role: string
  organisation: string
  current: boolean
}

export interface CareerContent {
  academic: CareerEntry[]
  administrative: CareerEntry[]
  otherAppointments: CareerEntry[]
}

export function getCareerContent(): CareerContent {
  return careerData as CareerContent
}
