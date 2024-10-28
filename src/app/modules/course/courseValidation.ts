import { z } from 'zod'

const preRequisiteCoursesSchemaValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const createCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(preRequisiteCoursesSchemaValidation)
      .optional(),
  }),
  isDelete: z.boolean().optional(),
})
const updatpreRequisiteCoursesSchemaValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const updatCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(updatpreRequisiteCoursesSchemaValidation)
      .optional(),
  }),
  isDeleted: z.boolean().optional(),
})

const AssignCourseFacultyValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
})

export const CourseValidations = {
  createCourseSchemaValidation,
  updatCourseSchemaValidation,
  AssignCourseFacultyValidationSchema,
}
