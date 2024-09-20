import { Request } from 'express'
import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { TRACKS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const trackIdValidator = validate(
  checkSchema(
    {
      track_id: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error(TRACKS_MESSAGES.TRACK_ID_IS_REQUIRED)
            }
            if (!ObjectId.isValid(value)) {
              throw new Error(TRACKS_MESSAGES.TRACK_ID_IS_INVALID)
            }
            const track = await databaseService.tracks.findOne({
              _id: new ObjectId(value)
            })
            if (!track) {
              throw new ErrorWithStatus({
                message: TRACKS_MESSAGES.TRACK_NOT_FOUND,
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
