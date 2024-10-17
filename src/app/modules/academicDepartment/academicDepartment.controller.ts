import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { AcademicDepartmentSevice } from './academicDepartment.service'

const createAcademicDepartmentIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentSevice.createAcademicDepartmentIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    })
  },
)
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentSevice.getAllAcademicDepartment()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic deaprtment data retrive successfully',
      data: result,
    })
  },
)

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { deptId } = req.params
    const result =
      await AcademicDepartmentSevice.getSingleAcademicDepartment(deptId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department retrive a data successfully',
      data: result,
    })
  },
)

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { deptId } = req.params
    const result = await AcademicDepartmentSevice.updateAcademicDepartment(
      deptId,
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    })
  },
)
export const AcademicDepartmentController = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
