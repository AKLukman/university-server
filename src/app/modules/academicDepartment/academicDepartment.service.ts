import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = AcademicDepartment.create(payload)
  return result
}
const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}
const getSingleAcademicDepartment = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty')
  return result
}
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicDepartmentSevice = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
