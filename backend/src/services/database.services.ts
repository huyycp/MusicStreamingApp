import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import { envConfig } from '~/constants/config'
import User from '~/models/schemas/User.schema'
import Like from '~/models/schemas/Like.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import Track from '~/models/schemas/Track.schema'
import Release from '~/models/schemas/Release.schema'
import Playlist from '~/models/schemas/Playlist.schema'
import Album from '~/models/schemas/Album.schema'
config()
const uri = envConfig.dbUri

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.dbName)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(envConfig.dbUsersCollection)
  }

  get likes(): Collection<Like> {
    return this.db.collection(envConfig.dbLikesCollection)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.dbRefreshTokensCollection)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(envConfig.dbFollowersCollection)
  }

  get tracks(): Collection<Track> {
    return this.db.collection(envConfig.dbTracksCollection)
  }

  get releases(): Collection<Release> {
    return this.db.collection(envConfig.dbReleasesCollection)
  }

  get playlists(): Collection<Playlist> {
    return this.db.collection(envConfig.dbPlaylistsCollection)
  }

  get albums(): Collection<Album> {
    return this.db.collection(envConfig.dbAlbumsCollection)
  }
}

const databaseService = new DatabaseService()
export default databaseService
