/* eslint-disable no-var */
import { Request } from 'express'
import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Track from '~/models/schemas/Track.schema'
import Release from '~/models/schemas/Release.schema'
import { handleUploadFiles } from '~/utils/files'

class TrackService {
  async getListTrack() {
    const tracks = await databaseService.tracks.find().toArray()
    return tracks
  }

  async getDetailTrack(track_id: string) {
    const id = new ObjectId(track_id)
    const track = await databaseService.tracks.findOne({ _id: id })
    const artirt_id = await databaseService.releases.find({ product_id: id }).toArray()
    const artists = await Promise.all(
      artirt_id.map(async (item) => {
        const artist = await databaseService.users.findOne({ _id: item.artist_id })
        return artist?.name
      })
    )
    return {
      track,
      artists
    }
  }

  async createTrack({ req, user_id }: { req: Request; user_id: string }) {
    const uploadResults = await handleUploadFiles(req)
    const { imageResults, audioResults, info } = uploadResults
    var { name, description, lyrics } = info
    name = name ? name[0] : null
    description = description ? description[0] : null
    lyrics = lyrics ? lyrics[0] : null
    const result = await databaseService.tracks.insertOne(
      new Track({
        name,
        description,
        lyrics,
        image: imageResults[0]?.url || '',
        path_audio: audioResults[0].url
      })
    )
    const track = await databaseService.tracks.findOne({ _id: result.insertedId })
    await databaseService.releases.insertOne(
      new Release({
        artist_id: new ObjectId(user_id),
        product_id: result.insertedId
      })
    )
    return track
  }
}

const trackService = new TrackService()
export default trackService
