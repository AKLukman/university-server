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

export const AuthController = { loginUser, passwordChange, refreshToken }
