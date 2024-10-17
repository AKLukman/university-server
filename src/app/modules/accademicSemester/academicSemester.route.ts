import { Router } from 'express'
import { AcademicSemesterController } from './academicSemester.controller'
import validationRequest from '../../middlewares/validationRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'

const router = Router()

router.post(
  '/create-academic-semester',
  validationRequest(
    AcademicSemesterValidation.createAcademicSemesterValidation,
  ),
  AcademicSemesterController.createAcademicSemester,
)
router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester)

router.patch(
  '/:semesterId',
  validationRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
)

router.get('/', AcademicSemesterController.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router
