import { z } from 'zod'
import { Days } from './offeredCourse.constant'

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semeterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
          return timeRegex.test(time)
        },
        {
          message: `Invalid time format. Expected time format "HH:MM" in 24 hours`,
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
          return timeRegex.test(time)
        },
        {
          message: `Invalid time format. Expected time format "HH:MM" in 24 hours`,
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`2000-01-01T${body.startTime}:00`)
        const end = new Date(`2000-01-01T${body.endTime}:00`)
        return end > start
      },
      {
        message: 'Start time should be before end time',
      },
    ),
})
const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().refine(
      (time) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
        return timeRegex.test(time)
      },
      {
        message: `Invalid time format. Expected time format "HH:MM" in 24 hours`,
      },
    ),
    endTime: z.string().refine(
      (time) => {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
        return timeRegex.test(time)
      },
      {
        message: `Invalid time format. Expected time format "HH:MM" in 24 hours`,
      },
    ),
  }),
})
export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
}
