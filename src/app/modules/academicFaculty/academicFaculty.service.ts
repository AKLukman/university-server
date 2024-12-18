import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = AcademicFaculty.create(payload)
  return result
}
const getAllAcademicFaculties = async () => {
  const result = await AcademicFaculty.find()
  return result
}
const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}
const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

// const deleteAcademicFaculty = async (id: string) => {
//   const result = await AcademicFaculty.deleteOne({ _id: id })
//   return result
// }

export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  //   deleteAcademicFaculty,
}
