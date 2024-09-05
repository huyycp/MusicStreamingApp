import { checkSchema, ParamSchema } from 'express-validator'
import { AUTH_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'
import { validate } from '~/utils/validation'

const passwordSchema: ParamSchema = {
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
}

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
      password: passwordSchema,
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

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: AUTH_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (user === null) {
              throw new Error(AUTH_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
            }
            req.user = user
            return true
          }
        }
      },
      password: passwordSchema
    },
    ['body']
  )
)
