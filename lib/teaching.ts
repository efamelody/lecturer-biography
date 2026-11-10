import 'server-only'
import teachingData from '@/content/teaching.json'

export interface TaughtCourse {
  code: string
  title: string
  period: string
}

export interface TaughtCourseGroup {
  level: string
  courses: TaughtCourse[]
}

export interface ThesisEntry {
  no: number
  title: string
  student: string
  year: string
}

export interface TeachingContent {
  taughtCourses: TaughtCourseGroup[]
  phdCompletedMain: ThesisEntry[]
  phdCompletedCo: ThesisEntry[]
  phdInProgress: ThesisEntry[]
  mscCompletedMain: ThesisEntry[]
  mscCompletedCo: ThesisEntry[]
  mscInProgress: ThesisEntry[]
}

export function getTeachingContent(): TeachingContent {
  return teachingData as TeachingContent
}
