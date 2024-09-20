import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class TrackService {
  async getListTrack() {
    const tracks = await databaseService.tracks.find().toArray()
    return tracks
  }

  async getDetailTrack(track_id: string) {
    const track = await databaseService.tracks.findOne({ _id: new ObjectId(track_id) })
    return track
  }
}

const trackService = new TrackService()
export default trackService
