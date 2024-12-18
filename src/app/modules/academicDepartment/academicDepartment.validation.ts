import { z } from 'zod'

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Department name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be string',
      required_error: 'Faculty name is required',
    }),
  }),
})
const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Department name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Faculty name is required',
      })
      .optional(),
  }),
})
export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
}
