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
import Verify from '~/models/schemas/Verify.schema'
import Verified from '~/models/schemas/Verified.schema'
import Genre from '~/models/schemas/Genre.schema'
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

  async indexVerify() {
    const exists = await this.verify.indexExists(['expiresAt_1'])

    if (!exists) {
      this.verify.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
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

  get verify(): Collection<Verify> {
    return this.db.collection(envConfig.dbVerifyCollection)
  }

  get verified(): Collection<Verified> {
    return this.db.collection(envConfig.dbVerifiedColection)
  }

  get genres(): Collection<Genre> {
    return this.db.collection(envConfig.dbGenresColection)
  }
}

const databaseService = new DatabaseService()
export default databaseService
