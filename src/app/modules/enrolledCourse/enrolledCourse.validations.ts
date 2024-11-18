import { z } from 'zod'

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
})
const updateCourseMarksValidationsSchema = z.object({
  body: z.object({
    semeterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
})

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
  updateCourseMarksValidationsSchema,
}
