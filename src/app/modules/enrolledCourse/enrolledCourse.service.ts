/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEnrolledCourse } from './enrolledCourse.interface'
import { OfferedCourse } from '../offeredCourse/offeredCourse.model'
import AppError from '../../error/AppError'
import httpStatus from 'http-status'
import EnrolledCourse from './enrolledCourse.model'
import { Student } from '../student/student.model'
import mongoose from 'mongoose'

const createEnrolledCourse = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  // Offered Course exists or not
  const { offeredCourse } = payload
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found!')
  }
  //checking section capacity
  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!')
  }
  const student = await Student.findOne({ id: userId }).select('id')
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!')
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semeterRegistration: isOfferedCourseExists?.semeterRegistration,
    offeredCourse,
    student: student?._id,
  })
  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'This student already enrolled!')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const result = await EnrolledCourse.create(
      [
        {
          semeterRegistration: isOfferedCourseExists.semeterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
          student: student._id,
        },
      ],
      { session },
    )
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enrolled this course!',
      )
    }
    const maxCapacity = isOfferedCourseExists.maxCapacity
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    })
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const EnrolledCourseServices = { createEnrolledCourse }
