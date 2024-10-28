import { model, Schema } from 'mongoose'
import { TSemesterRegistration } from './semesterReagistration.interface'
import { semesterReagistrationStatus } from './semesterRegistration.constant'

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: semesterReagistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
)
export const SemesterReagistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
)
