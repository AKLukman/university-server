import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { AcademicFacultyService } from './academicFaculty.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createAcademicFacultyIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    })
  },
)
const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getAllAcademicFaculties()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty data retrive successfully',
      data: result,
    })
  },
)

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params
    const result =
      await AcademicFacultyService.getSingleAcademicFaculty(facultyId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty data retrive successfully',
      data: result,
    })
  },
)

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params
    const result = await AcademicFacultyService.updateAcademicFaculty(
      facultyId,
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    })
  },
)
export const AcademicFacultyController = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
