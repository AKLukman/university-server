import { Router } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { EnrolledCourseValidations } from './enrolledCourse.validations'
import { EnrolledCourseController } from './enrolledCourse.controller'
import auth from '../../middlewares/auth'

const router = Router()
router.post(
  '/create-enrolled-course',
  auth('student'),
  validationRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
)
router.patch(
  '/update-course-marks',
  auth('admin', 'faculty'),
  validationRequest(
    EnrolledCourseValidations.updateCourseMarksValidationsSchema,
  ),
  EnrolledCourseController.updateCourseMarks,
)

export const EnrolledCourseRoutes = router
