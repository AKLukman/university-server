import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandler'
import notFoundApi from './middlewares/notFoundApi'
import router from './routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('hellof')
})

// Global error handling
app.use(globalErrorHandler)

// not found route
app.use(notFoundApi)

export default app