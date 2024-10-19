/* eslint-disable no-var */
import { Request } from 'express'
import { handleUploadFiles } from '~/utils/files'
import databaseService from './database.services'
import Album from '~/models/schemas/Album.schema'
import Release from '~/models/schemas/Release.schema'
import { ObjectId } from 'mongodb'
import { ProductType } from '~/constants/enums'

class AlbumService {
  async createAlbum({ req, user_id }: { req: Request; user_id: string }) {
    const uploadResults = await handleUploadFiles(req)
    const { imageResults, info } = uploadResults
    var { name } = info
    name = name ? name[0] : null
    const result = await databaseService.albums.insertOne(
      new Album({
        name,
        image: imageResults[0]?.url || ''
      })
    )
    const album = await databaseService.albums.findOne({ _id: result.insertedId })
    await databaseService.releases.insertOne(
      new Release({
        artist_id: new ObjectId(user_id),
        product_id: result.insertedId,
        product_type: ProductType.Album
      })
    )
    return album
  }

  async getAlbumByArtist({ user_id, limit, page }: { user_id: string; limit: number; page: number }) {
    const albums_of_artist = await databaseService.releases
      .aggregate<Release>([
        {
          $match: {
            artist_id: new ObjectId(user_id),
            product_type: ProductType.Album
          }
        }
      ])
      .toArray()
    const ids = albums_of_artist.map((item) => item.product_id as ObjectId)
    const [albums, total] = await Promise.all([
      databaseService.albums
        .aggregate([
          {
            $match: {
              _id: {
                $in: ids
              }
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
              },
              id_string: {
                $toString: '$_id'
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
            $lookup: {
              from: 'tracks',
              localField: 'id_string',
              foreignField: 'album_id',
              as: 'track_list'
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
              },
              number_of_tracks: {
                $size: '$track_list'
              }
            }
          },
          {
            $project: {
              artists: 0,
              track_list: 0,
              id_string: 0
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
      databaseService.albums
        .aggregate([
          {
            $match: {
              _id: {
                $in: ids
              }
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray()
    ])
    return {
      albums,
      total: total[0]?.total || 0
    }
  }

  async getDetailAlbum(album_id: string) {
    const [album, list_of_tracks] = await Promise.all([
      databaseService.albums
        .aggregate([
          {
            $match: {
              _id: new ObjectId(album_id)
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
        .toArray(),
      databaseService.tracks
        .aggregate([
          {
            $match: {
              album_id: album_id
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
              _id: 1,
              name: 1,
              image: 1,
              path_audio: 1,
              artistsName: 1
            }
          }
        ])
        .toArray()
    ])
    return {
      album,
      list_of_tracks
    }
  }

  async addTrackToAlbum({ album_id, track_list }: { album_id: string; track_list: string }) {
    const track_arr = JSON.parse(track_list)
    const trackId = track_arr.map((item: string) => new ObjectId(item))
    const date = new Date()
    await databaseService.tracks.updateMany(
      {
        _id: {
          $in: trackId
        }
      },
      {
        $set: { album_id, updated_at: date }
      }
    )
  }

  async getListAlbum({ limit, page }: { limit: number; page: number }) {
    const [albums, total] = await Promise.all([
      databaseService.albums
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
              },
              id_string: {
                $toString: '$_id'
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
            $lookup: {
              from: 'tracks',
              localField: 'id_string',
              foreignField: 'album_id',
              as: 'track_list'
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
              },
              number_of_tracks: {
                $size: '$track_list'
              }
            }
          },
          {
            $match: {
              number_of_tracks: { $gt: 0 }
            }
          },
          {
            $project: {
              artists: 0,
              track_list: 0,
              id_string: 0
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
      databaseService.albums
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
              },
              id_string: {
                $toString: '$_id'
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
            $lookup: {
              from: 'tracks',
              localField: 'id_string',
              foreignField: 'album_id',
              as: 'track_list'
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
              },
              number_of_tracks: {
                $size: '$track_list'
              }
            }
          },
          {
            $match: {
              number_of_tracks: { $gt: 0 }
            }
          },
          {
            $count: 'total'
          }
        ])
        .toArray()
    ])
    return {
      albums,
      total: total[0]?.total || 0
    }
  }
}

const albumService = new AlbumService()
export default albumService
