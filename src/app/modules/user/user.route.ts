import express from 'express'

import { UserControllers } from './user.controller'
import validationRequest from '../../middlewares/validationRequest'
import { UserValidation } from './user.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'

const router = express.Router()

router.post(
  '/create-student',

  validationRequest(UserValidation.userValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',

  validationRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',

  validationRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const UserRoutes = router
