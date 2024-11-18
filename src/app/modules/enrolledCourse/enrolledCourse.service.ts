/* eslint-disable @typescript-eslint/no-explicit-any */
import { TEnrolledCourse } from './enrolledCourse.interface'
import { OfferedCourse } from '../offeredCourse/offeredCourse.model'
import AppError from '../../error/AppError'
import httpStatus from 'http-status'
import EnrolledCourse from './enrolledCourse.model'
import { Student } from '../student/student.model'
import mongoose from 'mongoose'
import { SemesterReagistration } from '../semesterRegistration/semesterRegistration.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculty/faculty.model'
import { calculateGradePoints } from './enrolledCourse.utils'

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
  const student = await Student.findOne({ id: userId }, { _id: 1 })
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

  //   check max credits
  const semesterRegistration = await SemesterReagistration.findById(
    isOfferedCourseExists.semeterRegistration,
  ).select('maxCredit')
  const course = await Course.findById(isOfferedCourseExists.course)

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semeterRegistration: isOfferedCourseExists.semeterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: 'enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: null,
        totalEnrolledCredits: 1,
      },
    },
  ])
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0
  if (
    totalCredits &&
    semesterRegistration?.maxCredit &&
    totalCredits + course?.credits > semesterRegistration?.maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceed maximum number of credits',
    )
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
const updateCourseMarks = async (
  facultyId: string,
  paylod: Partial<TEnrolledCourse>,
) => {
  const { semeterRegistration, courseMarks, student, offeredCourse } = paylod

  const isSemesterRegistrationExits =
    await SemesterReagistration.findById(semeterRegistration)
  if (!isSemesterRegistrationExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "This semester doesn't exitss!")
  }
  const isOfferedCourseExits = await OfferedCourse.findById(offeredCourse)
  if (!isOfferedCourseExits) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This offered course doesn't exitss!",
    )
  }
  const isStudentExits = await Student.findById(student)
  if (!isStudentExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "This student doesn't exitss!")
  }
  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 })
  if (!faculty) {
    throw new AppError(httpStatus.BAD_REQUEST, "This faculty doesn't exitss!")
  }
  const isCoursBelongsToFaculty = await EnrolledCourse.findOne({
    semeterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  })
  if (!isCoursBelongsToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!')
  }
  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  }

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCoursBelongsToFaculty.courseMarks
    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5)
    console.log(totalMarks)
    const result = calculateGradePoints(totalMarks)
    modifiedData.grade = result.grade
    modifiedData.gradePoints = result.gradePoints
    modifiedData.isCompleted = true
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value
    }
  }
  const result = await EnrolledCourse.findByIdAndUpdate(
    isCoursBelongsToFaculty._id,
    modifiedData,
    {
      new: true,
    },
  )
  return result
}

export const EnrolledCourseServices = {
  createEnrolledCourse,
  updateCourseMarks,
}
