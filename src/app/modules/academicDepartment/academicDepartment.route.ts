import { Router } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { AcademicDepartmentValidations } from './academicDepartment.validation'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = Router()

router.post(
  '/create-departmnet',
  validationRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidation,
  ),
  AcademicDepartmentController.createAcademicDepartmentIntoDB,
)
router.get('/', AcademicDepartmentController.getAllAcademicDepartment)
router.get('/:deptId', AcademicDepartmentController.getSingleAcademicDepartment)
router.patch(
  '/:deptId',
  validationRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
