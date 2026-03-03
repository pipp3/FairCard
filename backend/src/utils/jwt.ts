import jwt from 'jsonwebtoken';


export const generateToken = (userId: string) => {
  const payload = { userId };
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT secret key is not defined');
  }
  return jwt.sign(payload, secretKey, {expiresIn: '1h'});
};

export const verifyToken = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT secret key is not defined');
    }
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
