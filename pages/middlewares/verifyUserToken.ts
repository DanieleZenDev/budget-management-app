import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export function verifyToken(req: NextApiRequest, res: NextApiResponse, next: Function) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

    jwt.verify(token, 'your_super_secret_jwt_key', (err, decoded) => {
        if (err || !decoded) { 
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        req.userId = (decoded as { id: string }).id; 
        next();
    });
}
