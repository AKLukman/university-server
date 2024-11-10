import { z } from 'zod'

// Zod schema for UserName
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: 'First name must be capitalized',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabets',
    }),
})

// Zod schema for Guardian
const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }),
})

// Zod schema for LocalGuardian
const localGuardianSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
})

// Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .max(20, { message: 'Password cannot be more than 20 characters' })
      .optional(),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: 'Gender must be male or female' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      // profileImage: z.string().optional(),
    }),
  }),
})

// Zod schema for UserName update
const userNameUpdateSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: 'First name must be capitalized',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabets',
    })
    .optional(),
})

// Zod schema for Guardian update
const guardianUpdateSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: "Father's name is required" })
    .optional(),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" })
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" })
    .optional(),
  motherName: z
    .string()
    .min(1, { message: "Mother's name is required" })
    .optional(),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" })
    .optional(),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" })
    .optional(),
})

// Zod schema for LocalGuardian update
const localGuardianUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Local guardian name is required' })
    .optional(),
  occupation: z
    .string()
    .min(1, { message: 'Occupation is required' })
    .optional(),
  contactNo: z
    .string()
    .min(1, { message: 'Contact number is required' })
    .optional(),
  address: z.string().min(1, { message: 'Address is required' }).optional(),
})

// Zod schema for updating a Student
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: userNameUpdateSchema.optional(),
        gender: z
          .enum(['male', 'female'], {
            errorMap: () => ({ message: 'Gender must be male or female' }),
          })
          .optional(),
        dateOfBirth: z.string().optional(),
        email: z
          .string()
          .email({ message: 'Invalid email address' })
          .min(1, { message: 'Email is required' })
          .optional(),
        contactNo: z
          .string()
          .min(1, { message: 'Contact number is required' })
          .optional(),
        emergencyContactNo: z
          .string()
          .min(1, { message: 'Emergency contact number is required' })
          .optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z
          .string()
          .min(1, { message: 'Present address is required' })
          .optional(),
        permanentAddress: z
          .string()
          .min(1, { message: 'Permanent address is required' })
          .optional(),
        guardian: guardianUpdateSchema.optional(),
        localGuardian: localGuardianUpdateSchema.optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImage: z.string().optional(),
      })
      .partial(), // Use .partial() to allow for any or all fields to be optional
  }),
})

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
