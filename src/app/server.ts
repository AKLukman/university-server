import { Server } from 'http'
import app from './app'
import config from './config'
import mongoose from 'mongoose'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main()

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  process.exit(1)
})
