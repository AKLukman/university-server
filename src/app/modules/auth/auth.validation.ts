import { z } from 'zod'

const loginValiadtionSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
})
const passwordChangeValiadtionSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required!' }),
    newPassword: z.string({ required_error: 'Password is required!' }),
  }),
})
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
})
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is required' }),
  }),
})
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is required' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
})
export const AuthValiadtion = {
  loginValiadtionSchema,
  passwordChangeValiadtionSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
}
