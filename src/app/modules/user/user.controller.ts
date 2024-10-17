import { UserService } from './user.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudetnt = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserService.createStudentIntoDb(password, studentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

export const UserController = {
  createStudetnt,
}
