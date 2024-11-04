import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../utils/sendEmail'

const loginUser = async (payload: TLoginUser) => {
  // check user exists or not
  const user = await User.isUserExistsByCustomId(payload?.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }

  //   user is already deleted or not
  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user already deleted!!')
  }
  //   user is already blocked or not
  const userStatus = user?.status
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user already deleted!!')
  }

  //   check password is correct or not
  if (!(await User.isPasswordMatched(payload.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, `Password or id doesn't matched`)
  }

  //   cretate toke and sent to user
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_sceret as string,
    config.jwt_access_expire_in as string,
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secrete as string,
    config.jwt_refresh_expire_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const passwordChange = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // check user exists or not
  const user = await User.isUserExistsByCustomId(userData?.userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }

  //   user is already deleted or not
  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user already deleted!!')
  }
  //   user is already blocked or not
  const userStatus = user?.status
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user already deleted!!')
  }

  //   check password is correct or not
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, `Password or id doesn't matched`)
  }

  //   hash new password
  const newHashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  )

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
  return null
}
const refreshToken = async (token: string) => {
  // checking if the token is missing
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
  }

  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secrete as string,
  ) as JwtPayload

  const { userId, iat } = decoded

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_sceret as string,
    config.jwt_access_expire_in as string,
  )
  return { accessToken }
}
const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  }
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_sceret as string,
    '10m',
  )
  const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`
  console.log(resetUILink)
  sendEmail(user?.email, resetUILink)
}
const resetPassword = async (
  payload: { id: string; password: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_sceret as string,
  ) as JwtPayload
  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden')
  }
  //   hash new password
  const newHashPassword = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_round),
  )

  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
}
export const AuthService = {
  loginUser,
  passwordChange,
  refreshToken,
  forgetPassword,
  resetPassword,
}
