import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const validationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // validation chck here
    try {
      await schema.parseAsync({ body: req.body, cookies: req.cookies })
      next()
    } catch (error) {
      next(error)
    }
  }
}
export default validationRequest
