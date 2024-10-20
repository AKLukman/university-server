import express from 'express'

import { UserControllers } from './user.controller'
import validationRequest from '../../middlewares/validationRequest'
import { UserValidation } from './user.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',

  validationRequest(UserValidation.userValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',

  // validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validationRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const UserRoutes = router
