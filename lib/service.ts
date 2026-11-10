import 'server-only'
import serviceData from '@/content/service.json'

export interface CommitteeRole {
  role: string
  organisation: string
  period: string
}

export interface EditorialRole {
  role: string
  publication: string
  publisher: string
  period: string
}

export interface ServiceContent {
  international: CommitteeRole[]
  national: CommitteeRole[]
  editorial: EditorialRole[]
}

export function getServiceContent(): ServiceContent {
  return serviceData as ServiceContent
}
