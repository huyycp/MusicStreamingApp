import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { RoleType } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { TRACKS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import { TokenPayLoad } from '~/models/requests/Auth.requests'
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

export const artistIdValidator = validate(
  checkSchema(
    {
      artist_id: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new Error(TRACKS_MESSAGES.ARTIST_ID_IS_REQUIRED)
            }
            if (!ObjectId.isValid(value)) {
              throw new Error(TRACKS_MESSAGES.ARTIST_ID_IS_INVALID)
            }
            const user = await databaseService.users.findOne({
              _id: new ObjectId(value)
            })
            if (!user || user.role !== RoleType.Artist) {
              throw new ErrorWithStatus({
                message: TRACKS_MESSAGES.ARTIST_NOT_FOUND,
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

export const verifiedArtistValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  if (user?.role !== RoleType.Artist) {
    return next(
      new ErrorWithStatus({
        message: TRACKS_MESSAGES.ROLE_NOT_ARTIST,
        status: HTTP_STATUS.FORBIDDEN
      })
    )
  }
  next()
}
