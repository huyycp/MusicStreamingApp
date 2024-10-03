import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { ALBUMS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const albumIdValidator = validate(
  checkSchema(
    {
      album_id: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error(ALBUMS_MESSAGES.ALBUM_ID_IS_REQUIRED)
            }
            if (!ObjectId.isValid(value)) {
              throw new Error(ALBUMS_MESSAGES.ALBUM_ID_IS_INVALID)
            }
            const album = await databaseService.albums.findOne({
              _id: new ObjectId(value)
            })
            if (!album) {
              throw new ErrorWithStatus({
                message: ALBUMS_MESSAGES.ALBUM_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
