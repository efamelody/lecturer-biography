import 'server-only'
import teachingData from '@/content/teaching.json'

export interface TeachingCourse {
  code: string
  title: string
  level: string
  years: string
}

export function getTeachingCourses(): TeachingCourse[] {
  return teachingData as TeachingCourse[]
}
