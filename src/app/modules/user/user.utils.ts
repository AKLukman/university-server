import { TAcademicSemester } from '../accademicSemester/academicSemester.interface'
import { User } from './user.model'

const findLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()
  return lastStudentId?.id ? lastStudentId.id : undefined
}
// Generate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString()
  // find last studentId
  const lastStudentId = await findLastStudentId()
  const lastStudentYear = lastStudentId?.substring(0, 4)
  const lastSemesterCode = lastStudentId?.substring(4, 6)
  const currenSemesterYear = payload.year
  const currenSemesterCode = payload.code
  if (
    lastStudentId &&
    lastStudentYear === currenSemesterYear &&
    lastSemesterCode === currenSemesterCode
  ) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
