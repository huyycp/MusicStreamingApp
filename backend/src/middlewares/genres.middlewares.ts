import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { GENRES_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'
export const addGenreIdValidator = validate(
  checkSchema(
    {
      genres: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error(GENRES_MESSAGES.LIST_OF_GENRES_IS_REQUIRED)
            }
            const list_of_id = JSON.parse(value)
            if (list_of_id.length === 0) {
              throw new Error(GENRES_MESSAGES.LIST_OF_GENRES_IS_REQUIRED)
            }
            if (list_of_id.some((id: any) => typeof id !== 'string' || !ObjectId.isValid(id))) {
              throw new Error(GENRES_MESSAGES.LIST_OF_GENRES_IS_INVALID)
            }
            const ids = list_of_id.map((id: string) => new ObjectId(id))
            const results = await databaseService.genres.find({ _id: { $in: ids } }).toArray()
            if (ids.length != results.length) {
              throw new ErrorWithStatus({
                message: GENRES_MESSAGES.EXISTING_GENRE_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
