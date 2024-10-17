import express from 'express'
import { StudentController } from './student.controller'
import validationRequest from '../../middlewares/validationRequest'
import { StudentValidations } from './student.validation'

const router = express.Router()

router.get('/', StudentController.getStudentsFromDb)
router.get('/:id', StudentController.getAStudent)
router.delete('/:id', StudentController.deleteAStudent)
router.patch(
  '/:id',
  validationRequest(StudentValidations.updateStudentValidationSchema),
  StudentController.updateStudent,
)

export const StudentRoutes = router
