import { Router } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'

const router = Router()

router.post(
  '/create-faculty',
  validationRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFacultyIntoDB,
)
router.get('/', AcademicFacultyController.getAllAcademicFaculties)
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty)
router.patch(
  '/:facultyId',
  validationRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
