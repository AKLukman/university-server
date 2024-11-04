import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body)
  const { refreshToken, accessToken, needsPasswordChange } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})
const passwordChange = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body
  const result = await AuthService.passwordChange(
    req.user as JwtPayload,
    passwordData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully',
    data: result,
  })
})
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrived successfully!',
    data: result,
  })
})
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id
  const result = await AuthService.forgetPassword(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link generated successfully!',
    data: result,
  })
})
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization
  const result = await AuthService.resetPassword(req.body, token as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  passwordChange,
  refreshToken,
  forgetPassword,
  resetPassword,
}
