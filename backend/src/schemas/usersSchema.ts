import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email({ message: "Email inválido" }).min(5).max(100),
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).max(100),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100).optional(),
  avatar: z.string().url({ message: "El avatar debe ser una URL válida" }).optional(),
  region: z.string().min(2, { message: "La región debe tener al menos 2 caracteres" }).optional(),
  commune: z.string().min(2, { message: "La comuna debe tener al menos 2 caracteres" }).optional(),
  phone: z.string().min(8, { message: "El teléfono debe tener al menos 8 caracteres" }).optional(),
});