import databaseService from './database.services'
class GenreService {
  async getListGenre() {
    const genres = await databaseService.genres.find().toArray()
    return genres
  }
}
const genreService = new GenreService()
export default genreService
