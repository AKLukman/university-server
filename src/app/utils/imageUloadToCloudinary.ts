import { v2 as cloudinary } from 'cloudinary'
import config from '../config'
import multer from 'multer'
import fs from 'fs'

export const imageUploadToCloudinary = async (
  filePath: string,
  imageName: string,
) => {
  // Cloudinary configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloud_api_key,
    api_secret: config.cloud_api_secret,
  })

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: imageName,
    })

    // Delete the file from the local directory after successful upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file at ${filePath}:`, err)
      } else {
        console.log(`File deleted successfully from ${filePath}`)
      }
    })

    return result
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error)
    throw error
  }
}

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
