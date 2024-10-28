import { Router } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { OfferedCourseValidation } from './offeredCourse.validation'
import { OfferedCourseController } from './offeredCourse.controller'

const router = Router()
router.post(
  '/create-offered-course',
  validationRequest(
    OfferedCourseValidation.createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
)
router.patch(
  '/:id',
  validationRequest(
    OfferedCourseValidation.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateOfferedCourse,
)

export const OfferedCourseRoutes = router
