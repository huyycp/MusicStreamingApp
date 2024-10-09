import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class UserService {
  async getMe(user_id: string) {
    const user = await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0
        }
      }
    )
    return user
  }
}

const userService = new UserService()
export default userService
