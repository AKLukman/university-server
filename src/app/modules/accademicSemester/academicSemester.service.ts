import { nameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAacademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (nameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Semester code is invalid')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    nameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterService = {
  createAacademicSemesterIntoDb,
  updateAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
}
