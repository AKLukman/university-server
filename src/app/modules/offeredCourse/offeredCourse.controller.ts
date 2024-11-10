import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OfferedCourseServices } from './offeredCourse.service'

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourse(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offred course created successfully!',
    data: result,
  })
})
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourse()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offred course retrived successfully!',
    data: result,
  })
})
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OfferedCourseServices.updateOfferedCourse(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offred course updated successfully!',
    data: result,
  })
})
export const OfferedCourseController = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourse,
}
