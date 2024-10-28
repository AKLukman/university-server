import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { AcademicSemester } from '../accademicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterReagistration.interface'
import { SemesterReagistration } from './semesterRegistration.model'
import QueryBuilder from '../../builder/queryBuilder'

const createSemesterRegistration = async (paylod: TSemesterRegistration) => {
  const academicSemester = paylod?.academicSemester

  //   is there any registered semester 'UPCOMING' OR O'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterReagistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    })
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester`,
    )
  }

  // check academic semester is exist
  const isExistAcademicSemester =
    await AcademicSemester.findById(academicSemester)
  if (!isExistAcademicSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester doesn't exist!",
    )
  }

  //   semester is already registered or not
  const isSemesterRegistered = await SemesterReagistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    )
  }
  const result = await SemesterReagistration.create(paylod)
  return result
}

const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const semesterReagistrationQuery = new QueryBuilder(
    SemesterReagistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await semesterReagistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistration = async (id: string) => {
  const result = await SemesterReagistration.findById(id)
  return result
}

const updateSemesterReagistration = async (
  id: string,
  paylod: Partial<TSemesterRegistration>,
) => {
  // semester is exist or not
  const isSemesterExist = await SemesterReagistration.findById(id)
  const requestedSemesterStatus = paylod.status
  if (!isSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester does'nt exist")
  }
  // checking semester is ended or not. if ended we can't change it.
  const currentSemesterStatus = isSemesterExist?.status
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    )
  }

  //UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === 'UPCOMING' &&
    requestedSemesterStatus === 'ENDED'
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't change it directly ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    )
  }
  if (
    currentSemesterStatus === 'ONGOING' &&
    requestedSemesterStatus === 'UPCOMING'
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't change it directly ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    )
  }
  const result = await SemesterReagistration.findByIdAndUpdate(id, paylod, {
    new: true,
    runValidators: true,
  })
  return result
}

export const SemesterRegistrationServices = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterReagistration,
}
