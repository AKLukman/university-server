import express, { NextFunction, Request, Response } from 'express'

import { UserControllers } from './user.controller'
import validationRequest from '../../middlewares/validationRequest'
import { UserValidation } from './user.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import auth from '../../middlewares/auth'
import { upload } from '../../utils/imageUloadToCloudinary'

const router = express.Router()

router.post(
  '/create-student',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
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
router.get('/getMe', auth('admin', 'faculty', 'student'), UserControllers.getMe)
router.patch(
  '/change-status/:id',
  auth('admin'),
  validationRequest(UserValidation.changeUserStatusValidtion),
  UserControllers.changeUserStatus,
)

export const UserRoutes = router
