import express from 'express'
import { UserController } from './user.controller'
import validationRequest from '../../middlewares/validationRequest'
import { StudentValidations } from '../student/student.validation'

const router = express.Router()

router.post(
  '/create-student',
  validationRequest(StudentValidations.createStudentValidationSchema),
  UserController.createStudetnt,
)

export const UserRoutes = router
