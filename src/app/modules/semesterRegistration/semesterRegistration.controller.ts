import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SemesterRegistrationServices } from './semesterRegistration.service'

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.createSemesterRegistration(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registered Successfully!',
    data: result,
  })
})
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.getAllSemesterRegistration(
    req.query,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrived Successfully!',
    data: result,
  })
})
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistration(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrived Successfully!',
    data: result,
  })
})
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await SemesterRegistrationServices.updateSemesterReagistration(
    id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated Successfully!',
    data: result,
  })
})
export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
}
