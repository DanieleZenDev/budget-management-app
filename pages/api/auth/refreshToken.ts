import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

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

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}
