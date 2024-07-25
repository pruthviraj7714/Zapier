import { z } from 'zod'

export const signUpSchema = z.object({
    name : z.string().min(3),
    email : z.string().email(),
    password : z.string().min(6)
}) 

export const zapCreateSchema = z.object({
    triggerId : z.string(),
    triggerMetdData : z.any().optional(),
    actions : z.array(z.object({
        actionId : z.string(),
        actionMetaData : z.any().optional()
    }))
})