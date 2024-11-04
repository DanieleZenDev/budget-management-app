
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function verifyToken(handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'No token provided' }); 
        }

        try {
            const decoded = jwt.verify(token, 'your_super_secret_jwt_key');
            req.userId = decoded; 

            return handler(req, res);
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
}
