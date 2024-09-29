/* eslint-disable no-var */
import { Request } from 'express'
import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import Track from '~/models/schemas/Track.schema'
import Release from '~/models/schemas/Release.schema'
import { handleUploadFiles } from '~/utils/files'

class TrackService {
  async getListTrack({ limit, page }: { limit: number; page: number }) {
    const [tracks, total] = await Promise.all([
      databaseService.tracks
        .aggregate([
          {
            $lookup: {
              from: 'releases',
              localField: '_id',
              foreignField: 'product_id',
              as: 'artists'
            }
          },
          {
            $addFields: {
              artists: {
                $map: {
                  input: '$artists',
                  as: 'artist',
                  in: '$$artist.artist_id'
                }
              }
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'artists',
              foreignField: '_id',
              as: 'artistsName'
            }
          },
          {
            $addFields: {
              artistsName: {
                $map: {
                  input: '$artistsName',
                  as: 'artistName',
                  in: '$$artistName.name'
                }
              }
            }
          },
          {
            $project: {
              artists: 0
            }
          },
          {
            $skip: limit * (page - 1)
          },
          {
            $limit: limit
          }
        ])
        .toArray(),
      databaseService.tracks.countDocuments()
    ])
    return {
      tracks,
      total
    }
  }

  async getDetailTrack(track_id: string) {
    const track = await databaseService.tracks
      .aggregate([
        {
          $match: {
            _id: new ObjectId(track_id)
          }
        },
        {
          $lookup: {
            from: 'releases',
            localField: '_id',
            foreignField: 'product_id',
            as: 'artists'
          }
        },
        {
          $addFields: {
            artists: {
              $map: {
                input: '$artists',
                as: 'artist',
                in: '$$artist.artist_id'
              }
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'artists',
            foreignField: '_id',
            as: 'artistsName'
          }
        },
        {
          $addFields: {
            artistsName: {
              $map: {
                input: '$artistsName',
                as: 'artistName',
                in: '$$artistName.name'
              }
            }
          }
        },
        {
          $project: {
            artists: 0
          }
        }
      ])
      .toArray()
    return track[0]
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
