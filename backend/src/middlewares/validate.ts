import {z} from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction)=> {
    const result = schema.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({ errors: result.error.flatten().fieldErrors })
    }
    req.body = result.data
    next()
}