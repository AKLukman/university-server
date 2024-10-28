import mongoose, { model, Schema } from 'mongoose'
import { TOfferedCourse } from './offeredCourse.interface'
import { Days } from './offeredCourse.constant'

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semeterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SemesterRegestration',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Faculty',
    },
    days: [
      {
        type: String,
        enum: Days,
        required: true,
      },
    ],
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const OfferedCourse = model<TOfferedCourse>(
  'offeredCourse',
  offeredCourseSchema,
)
