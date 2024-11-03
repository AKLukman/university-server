import { Router } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { AuthValiadtion } from './auth.validation'
import { AuthController } from './auth.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()
router.post(
  '/login',
  validationRequest(AuthValiadtion.loginValiadtionSchema),
  AuthController.loginUser,
)
router.post(
  '/refresh-token',

  validationRequest(AuthValiadtion.refreshTokenValidationSchema),
  AuthController.refreshToken,
)

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationRequest(AuthValiadtion.passwordChangeValiadtionSchema),
  AuthController.passwordChange,
)

export const AuthRoutes = router
