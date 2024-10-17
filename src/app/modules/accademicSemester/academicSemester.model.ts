import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import { Months } from './academicSemester.constant'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: [true, 'Semester name is required'],
      enum: {
        values: ['Autumn', 'Summer', 'Fall'],
        message: '{VALUE} is not valid',
      },
    },
    code: {
      type: String,
      required: [true, 'Semester code is required'],
      enum: {
        values: ['01', '02', '03'],
        message: '{VALUE} is not valid',
      },
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)

// middleware same year and semester exist or not
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  })
  if (isSemesterExist) {
    throw new Error('This semsester is already exist for this year!')
  }
  next()
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
