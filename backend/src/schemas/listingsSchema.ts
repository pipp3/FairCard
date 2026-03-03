import { z } from "zod";

export const listingSchema = z.object({
  vendor: z
    .string()
    .min(3, { message: "El vendor debe tener al menos 3 caracteres" }),
  manufacturer: z
    .string()
    .min(3, { message: "El fabricante debe tener al menos 3 caracteres" }),
  model: z
    .string()
    .min(2, { message: "El modelo debe tener al menos 2 caracteres" }),
  exactModel: z
    .string()
    .min(2, { message: "El modelo exacto debe tener al menos 2 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  vram: z
    .number()
    .int()
    .positive()
    .min(1, { message: "La VRAM debe ser un número positivo mayor a 0" }),
  vramType: z
    .string()
    .min(2, { message: "El tipo de VRAM debe tener al menos 2 caracteres" }),
  memoryBus: z
    .number()
    .int()
    .positive()
    .min(32, {
      message: "El bus de memoria debe ser un número positivo mayor a 32 bits",
    })
    .optional(),
  tdp: z
    .number()
    .int()
    .positive()
    .min(30, { message: "El TDP debe ser un número positivo mayor a 30W" })
    .optional(),
  powerConnectors: z
    .string()
    .min(2, {
      message: "Los conectores de energía deben tener al menos 2 caracteres",
    })
    .optional(),
  slot: z
    .string()
    .min(2, { message: "El tipo de slot debe tener al menos 2 caracteres" })
    .optional(),
  price: z
    .number()
    .positive({ message: "El precio debe ser un número positivo" })
    .int({ message: "El precio debe ser un número entero" }),
  condition: z.enum(["LIKE_NEW", "GOOD", "NO_MAINTENANCE"], {
    message:
      "La condición debe ser uno de los valores válidos: LIKE_NEW, GOOD, NO_MAINTENANCE",
  }),
  images: z
    .array(z.string().url({ message: "Cada imagen debe ser una URL válida" }))
    .min(1, { message: "Debe haber al menos una imagen" }),
});

export const updateListingSchema = listingSchema.omit({vendor: true,manufacturer: true,model: true}).partial();

