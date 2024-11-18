import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseServices } from './enrolledCourse.service'

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req?.user?.userId
  const result = await EnrolledCourseServices.createEnrolledCourse(
    userId,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course created successfully!',
    data: result,
  })
})
const updateCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user?.userId

  const result = await EnrolledCourseServices.updateCourseMarks(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks updated successfully!',
    data: result,
  })
})

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateCourseMarks,
}
