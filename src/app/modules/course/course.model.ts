import { model, Schema } from 'mongoose'
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface'

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
)

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Course title is required'],
    },
    prefix: {
      type: String,
      trim: true,
      required: [true, 'Course prefix is required'],
    },
    code: {
      type: Number,
      trim: true,
      required: [true, 'Course code is required'],
    },
    credits: {
      type: Number,
      trim: true,
      required: [true, 'Course credits is required'],
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Course = model<TCourse>('Course', courseSchema)

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
})

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
)
