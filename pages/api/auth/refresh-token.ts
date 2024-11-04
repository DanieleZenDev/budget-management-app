import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, 'your_super_secret_jwt_key') as { id: string};

    const newAccessToken = jwt.sign(
      { id: decoded.id }, 
      'your_super_secret_jwt_key',
      { expiresIn: '30m' } 
    );
    const existingUser = await prisma.user.findFirst({
      where: { UserID: decoded.id},
    });

    //add it on user table 
    await prisma.user.update({
      where: { id: existingUser?.id }, 
      data: {
        UserID: decoded.id 
      }
    });
    
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}
