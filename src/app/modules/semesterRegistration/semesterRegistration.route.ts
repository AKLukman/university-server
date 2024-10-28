import { Router } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { SemesterReagistrationValidations } from './semesterRegistration.validation'
import { SemesterRegistrationController } from './semesterRegistration.controller'

const router = Router()

router.post(
  '/create-semester-registration',
  validationRequest(
    SemesterReagistrationValidations.createSemesterReagistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
)
router.get('/', SemesterRegistrationController.getAllSemesterRegistration)
router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration)
router.patch(
  '/:id',
  validationRequest(
    SemesterReagistrationValidations.updateSemesterReagistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
)
export const SemesterRegistrationRoutes = router
