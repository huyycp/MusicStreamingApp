import { checkSchema, ParamSchema } from 'express-validator'
import { AUTH_MESSAGES } from '~/constants/messages'
import authService from '~/services/auth.services'
import { validate } from '~/utils/validation'

export const emailValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: AUTH_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: AUTH_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      }
    },
    ['body']
  )
)

export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: AUTH_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGES.NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: AUTH_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: AUTH_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 50
          },
          errorMessage: AUTH_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_10_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 10,
            minLowercase: 1,
            minUppercase: 0,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: AUTH_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      },
      role: {
        notEmpty: {
          errorMessage: AUTH_MESSAGES.ROLE_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGES.ROLE_MUST_BE_A_STRING
        }
      },
      gender: {
        notEmpty: {
          errorMessage: AUTH_MESSAGES.GENDER_IS_REQUIRED
        },
        isString: {
          errorMessage: AUTH_MESSAGES.GENDER_MUST_BE_A_STRING
        }
      }
    },
    ['body']
  )
)
