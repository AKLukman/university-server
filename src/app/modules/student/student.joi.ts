// create validation schema using joi

import Joi from 'joi'

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, 'capitalized')
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.name': '{#value} is not in capitalized format',
    }),

  middleName: Joi.string().optional(),

  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/, 'alpha')
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.name': '{#value} is not valid',
    }),
})

// Guardian schema validation using Joi
const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': "Mother's contact number is required",
  }),
})

// Local Guardian schema validation using Joi
const localGuardianSchema = Joi.object({
  name: Joi.string().optional(),
  occopation: Joi.string().optional(),
  contactNo: Joi.string().optional(),
  address: Joi.string().optional(),
})
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameSchema.required().messages({
    'object.base': 'Student name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not valid',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Date of birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email type',
    'string.empty': 'Email is required',
  }),
  contacNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianSchema.required().messages({
    'object.base': 'Guardian details are required',
  }),
  localGurdian: localGuardianSchema.required().messages({
    'object.base': 'Local guardian details are required',
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not valid',
  }),
})

export default studentValidationSchema
