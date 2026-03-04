import { prisma } from "../db/client.js";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
  name?: string;
  avatar?: string;
  region?: string;
  commune?: string;
  phone?: string;
}

export const createUser = async (data: CreateUserInput) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      throw new Error("User already exists");
    }
    const user = await prisma.user.create({
      data,
    });
    if (!user) {
      throw new Error("Error creating user");
    }
    return user;
  } catch (error: any) {
    throw error;
  }
};

export const updateUser = async (id: string, data: UpdateUserInput) => {
  try {
    if (Object.keys(data).length === 0) {
      throw new Error("No data provided for update");
    }
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...data },
    });
    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id },select: { name: true, email: true, avatar: true, region: true, commune: true, phone: true,createdAt: true } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw error;
  }
};
