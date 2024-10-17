import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { studentServices } from './student.service'

const getStudentsFromDb = catchAsync(async (req, res) => {
  const result = await studentServices.getStudentsFromDb(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrive successfully',
    data: result,
  })
})

const getAStudent = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await studentServices.getAStudent(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrive successfully',
    data: result,
  })
})

const deleteAStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await studentServices.deleteAStudent(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
})
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body
  const result = await studentServices.updateStudent(id, student)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  })
})
export const StudentController = {
  getStudentsFromDb,
  getAStudent,
  deleteAStudent,
  updateStudent,
}
