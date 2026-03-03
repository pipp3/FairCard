import {z} from 'zod'
export const registerSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres'})
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, { message: 'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial' }),
    name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    region: z.string().min(4, { message: 'La región debe tener al menos 4 caracteres' }),
    commune: z.string().min(4, { message: 'La comuna debe tener al menos 4 caracteres' }),
    phone: z.string().min(9, { message: 'El teléfono debe tener al menos 9 caracteres' })
})

export const loginSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres'})
})