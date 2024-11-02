import { ObjectId } from 'mongodb'
import databaseService from './database.services'
class GenreService {
  async getListGenre() {
    const genres = await databaseService.genres.find().toArray()
    return genres
  }

  async addGenresToFavor({ user_id, genres }: { user_id: string; genres: string }) {
    const genre_arr = JSON.parse(genres)
    const genreId = genre_arr.map((item: string) => new ObjectId(item))
    const date = new Date()
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: { genres: genreId, updated_at: date }
      }
    )
  }
}
const genreService = new GenreService()
export default genreService
