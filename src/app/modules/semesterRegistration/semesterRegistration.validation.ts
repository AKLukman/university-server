import { z } from 'zod'
import { semesterReagistrationStatus } from './semesterRegistration.constant'

const createSemesterReagistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(semesterReagistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
})
const updateSemesterReagistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(semesterReagistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
})

export const SemesterReagistrationValidations = {
  createSemesterReagistrationValidationSchema,
  updateSemesterReagistrationValidationSchema,
}
