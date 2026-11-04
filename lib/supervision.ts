import 'server-only'
import supervisionData from '@/content/supervision.json'

export interface SupervisionRecord {
  id: string
  name: string
  degree: 'PhD' | 'MSc'
  thesisTitle: string
  yearCompleted?: number
  yearStarted?: number
  role: string
  note?: string
}

export interface SupervisionContent {
  intro: {
    eyebrow: string
    heading: string
    description: string
  }
  completedPhdMain: SupervisionRecord[]
  completedPhdCo: SupervisionRecord[]
  currentPhd: SupervisionRecord[]
  completedMscMain: SupervisionRecord[]
  completedMscCo: SupervisionRecord[]
  currentMsc: SupervisionRecord[]
}

const supervision = supervisionData as SupervisionContent

export function getSupervisionContent(): SupervisionContent {
  return supervision
}

export function getSupervisionStats() {
  const completedPhd =
    supervision.completedPhdMain.length + supervision.completedPhdCo.length
  const currentPhd = supervision.currentPhd.length
  const completedMsc =
    supervision.completedMscMain.length + supervision.completedMscCo.length
  const currentMsc = supervision.currentMsc.length

  return {
    completedPhd,
    currentPhd,
    completedMsc,
    currentMsc,
    total: completedPhd + currentPhd + completedMsc + currentMsc,
  }
}

export function getCompletedSupervision(): SupervisionRecord[] {
  return [
    ...supervision.completedPhdMain,
    ...supervision.completedPhdCo,
    ...supervision.completedMscMain,
    ...supervision.completedMscCo,
  ]
}
