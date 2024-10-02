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
}

const albumService = new AlbumService()
export default albumService
