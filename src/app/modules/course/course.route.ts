import { Router } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { CourseValidations } from './courseValidation'
import { CourseController } from './course.controller'

const router = Router()

router.post(
  '/create-course',
  validationRequest(CourseValidations.createCourseSchemaValidation),
  CourseController.createCourseIntoDB,
)
router.get('/', CourseController.getAllCourseFromDB)
router.get('/:id', CourseController.getSingleCourseFromDB)
router.delete('/:id', CourseController.deleteCourseFromDB)
router.patch(
  '/:id',
  validationRequest(CourseValidations.updatCourseSchemaValidation),
  CourseController.updateCourseFromDB,
)
router.put(
  '/:courseId/assign-faculties',
  validationRequest(CourseValidations.AssignCourseFacultyValidationSchema),
  CourseController.assignFaculties,
)
router.delete(
  '/:courseId/remove-faculties',
  validationRequest(CourseValidations.AssignCourseFacultyValidationSchema),
  CourseController.removeFaculties,
)

export const courseRoutes = router
