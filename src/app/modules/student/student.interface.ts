import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TGuardian = {
  fatherName: string
  fatherContactNo: string
  fatherOccupation: string
  motherName: string
  motherContactNo: string
  motherOccupation: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  password: string
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  admissionSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  isDeleted: boolean
}

// creating static method
export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>
}
