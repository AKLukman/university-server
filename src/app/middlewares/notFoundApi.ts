import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const notFoundApi = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found!!',
    error: '',
  })

  next()
}
export default notFoundApi
