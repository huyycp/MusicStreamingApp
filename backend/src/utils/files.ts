import { Request } from 'express'
import { File } from 'formidable'
import fs from 'fs'
import fsPromise from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_MEDIA_DIR, UPLOAD_MEDIA_TEMP_DIR } from '~/constants/dir'
import { Media } from '~/models/Other'
import { uploadFileToS3 } from './s3'
import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3'
import { MediaType } from '~/constants/enums'
import { nanoid } from 'nanoid'

export const initFolder = () => {
  ;[UPLOAD_MEDIA_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      })
    }
  })
}

export const handleUploadFiles = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: UPLOAD_MEDIA_TEMP_DIR,
    maxFiles: 5,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    maxTotalFileSize: 25 * 1024 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      if (name === 'image' && (mimetype?.includes('image/') || mimetype?.includes('application/'))) return true
      if (name === 'audio' && (mimetype?.includes('audio/') || mimetype?.includes('application/'))) return true
      form.emit('error' as any, new Error('File type is not valid') as any)
      return false
    }
  })

  return new Promise<{ imageResults: Media[]; audioResults: Media[]; info: any }>((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      const images = files.image || []
      const audios = files.audio || []

      const info = fields

      if (images.length === 0 && audios.length === 0) {
        return reject(new Error('No files uploaded'))
      }

      const imageResults: Media[] = await Promise.all(
        images.map(async (file) => {
          const newName = getNameFromFullName(file.newFilename)
          const newFullFilename = `${newName}.jpg`
          const newPath = path.resolve(UPLOAD_MEDIA_DIR, newFullFilename)
          sharp.cache(false)
          await sharp(file.filepath).jpeg().toFile(newPath)
          const s3Result = await uploadFileToS3({
            filename: 'images/' + newFullFilename,
            filepath: newPath,
            contentType: (await import('mime')).default.getType(newPath) as string
          })
          await Promise.all([fsPromise.unlink(file.filepath), fsPromise.unlink(newPath)])
          return {
            url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
            type: MediaType.Image
          }
        })
      )

      const audioResults: Media[] = await Promise.all(
        audios.map(async (file) => {
          const s3Result = await uploadFileToS3({
            filename: 'audios/' + file.newFilename,
            contentType: (await import('mime')).default.getType(file.filepath) as string,
            filepath: file.filepath
          })
          fsPromise.unlink(file.filepath)
          return {
            url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
            type: MediaType.Audio
          }
        })
      )

      resolve({ imageResults, audioResults, info })
    })
  })
}

export const getNameFromFullName = (fullName: string) => {
  const nameArr = fullName.split('.')
  nameArr.pop()
  return nameArr.join('')
}

export const getExtension = (fullname: string) => {
  const namearr = fullname.split('.')
  return namearr[namearr.length - 1]
}

export const getFiles = (dir: string, files: string[] = []) => {
  const fileList = fs.readdirSync(dir)
  for (const file of fileList) {
    const name = `${dir}/${file}`
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files)
    } else {
      files.push(name)
    }
  }
  return files
}
