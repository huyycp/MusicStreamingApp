import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class UserService {
  async getMe(user_id: string) {
    const user = await databaseService.users
      .aggregate([
        {
          $match: {
            _id: new ObjectId(user_id)
          }
        },
        {
          $lookup: {
            from: 'genres',
            localField: 'genres',
            foreignField: '_id',
            as: 'genres'
          }
        },
        {
          $project: {
            genres: {
              created_at: 0,
              updated_at: 0
            }
          }
        }
      ])
      .toArray()
    return user[0]
  }
}

const userService = new UserService()
export default userService
