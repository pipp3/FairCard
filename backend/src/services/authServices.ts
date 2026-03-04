import bcrypt from 'bcrypt';
import {prisma} from '../db/client.js';
import {generateToken} from '../utils/jwt.js';

interface RegisterInput {
    email: string;
    password: string;
    name: string;
    region: string;
    commune: string;
    phone: string;
}
interface LoginInput {
    email: string;
    password: string;
}
export const registerUser = async (data: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({where: {email: data.email}});
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
        data: {
            email: data.email,
            passwordHash: hashedPassword,
            name: data.name,
            region: data.region,
            commune: data.commune,
            phone: data.phone
        }
    });
    if (!user) {
         await prisma.user.delete({where: {email: data.email}});
        throw new Error('Error creating user');
    }
    const token = generateToken(user.id, user.role);
    
    return { user, token };
}

export const loginUser = async (data: LoginInput) => {
    const user = await prisma.user.findUnique({where: {email: data.email}});
    
    if (!user) {
        throw new Error('Email incorrecto o contraseña incorrecta');
    }
    if(!user?.passwordHash) throw new Error('Email incorrecto o contraseña incorrecta');
    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error('Email incorrecto o contraseña incorrecta');
    }
    return {user, token: generateToken(user.id, user.role)};
}