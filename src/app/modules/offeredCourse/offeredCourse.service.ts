import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { SemesterReagistration } from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse, TSchedule } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { Faculty } from '../faculty/faculty.model'
import { Course } from '../course/course.model'
import hasTimeConflict from './offeredCourse.utils'
import { Days } from './offeredCourse.constant'
import { semesterReagistrationStatus } from '../semesterRegistration/semesterRegistration.constant'

const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    academicDepartment,
    academicFaculty,
    course,
    semeterRegistration,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload

  const isSemesterRegistrationExist =
    await SemesterReagistration.findById(semeterRegistration)
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration  not found!',
    )
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester
  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department  not found!')
  }
  const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty  not found!')
  }

  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!')
  }
  const isCourseExist = await Course.findById(course)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is  not found!')
  }

  //This department belongs to the faculty
  const isDepartmentBelogsToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  })
  if (!isDepartmentBelogsToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isAcademicDepartmentExist?.name} does not belongs to this ${isAcademicFacultyExist?.name}`,
    )
  }

  //   same course in the same section is exists
  const isSameCourseInSameSectionExits = await OfferedCourse.findOne({
    semeterRegistration,
    course,
    section,
  })
  if (isSameCourseInSameSectionExits) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This offered with same section course already exists`,
    )
  }

  //schdules of the faculties
  const assignedSchedule = await OfferedCourse.find({
    semeterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at this time! Choose another time or day.',
    )
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester })
  return result
}

const updateOfferedCourse = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload
  const isExistOfferedCourse = await OfferedCourse.findById(id)
  if (!isExistOfferedCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!!')
  }
  const isFacultyExists = await Faculty.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!!')
  }
  //schdules of the faculties
  const semesterRegistration = isExistOfferedCourse.semeterRegistration

  //   check the semester registration status
  const semesterRegistrationStatus =
    await SemesterReagistration.findById(semesterRegistration)
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.CONFLICT,
      `You can not update update this offered course as it is ${semesterRegistrationStatus.status}`,
    )
  }

  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not available at this time! Choose another time or day.',
    )
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}
export const OfferedCourseServices = {
  createOfferedCourse,
  updateOfferedCourse,
}
