import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../error/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'

import { studentSearchableFields } from './student.constant'
import QueryBuilder from '../../builder/queryBuilder'

const getStudentsFromDb = async (query: Record<string, unknown>) => {
  // const queryObject = { ...query } //copy of query
  // let searchTerm = ''
  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string
  // }
  // const searchQuery = Student.find({
  //   $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })
  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludeFields.forEach((ef) => delete queryObject[ef])
  // const filterdQuery = searchQuery
  //   .find(queryObject)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })
  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }
  // const sortQuery = filterdQuery.sort(sort)
  // let limit = 1
  // let page = 1
  // let skip = 0
  // if (query.limit) {
  //   limit = Number(query.limit)
  // }
  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }
  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit)
  // let fields = '__v'
  // // fields (name,email)
  // // split kre (name email)
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }
  // const fieldsQuery = await limitQuery.select(fields)
  // return fieldsQuery

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  const meta = await studentQuery.countTotal()
  return { result, meta }
}
const getAStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

// update student
const updateStudent = async (id: string, paylod: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = paylod

  const updatedStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedStudentData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatedStudentData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updatedStudentData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findByIdAndUpdate(id, updatedStudentData, {
    new: true,
    runValidators: true,
  })

  return result
}

// delete student
const deleteAStudent = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student')
    }

    const userId = deletedStudent.user

    // delete a user
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete user')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const studentServices = {
  getStudentsFromDb,
  getAStudent,
  deleteAStudent,
  updateStudent,
}
