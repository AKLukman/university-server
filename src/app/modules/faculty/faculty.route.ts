import express from 'express'

import { FacultyControllers } from './faculty.controller'
import { updateFacultyValidationSchema } from './faculty.validation'
import validationRequest from '../../middlewares/validationRequest'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  validationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.delete('/:id', FacultyControllers.deleteFaculty)

router.get('/', auth(USER_ROLE.admin), FacultyControllers.getAllFaculties)

export const FacultyRoutes = router
