import { z } from 'zod'
import { Months } from './academicSemester.constant'

const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Semester name is required',
      invalid_type_error: '{VALUE} is not valid',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Semester code is required',
      invalid_type_error: '{VALUE} is not valid',
    }),
    year: z.string().regex(/^\d{4}$/, 'Year must be a valid 4-digit year'),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
})

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum(['Autumn', 'Summer', 'Fall'], {
        required_error: 'Semester name is required',
        invalid_type_error: '{VALUE} is not valid',
      })
      .optional(),
    year: z.string().optional(),
    code: z
      .enum(['01', '02', '03'], {
        required_error: 'Semester code is required',
        invalid_type_error: '{VALUE} is not valid',
      })
      .optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
})

export const AcademicSemesterValidation = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidationSchema,
}
