
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends NextApiRequest {
	userId?: string | number; 
}

export default function verifyToken(
	handler: (req: AuthenticatedRequest, res: NextApiResponse) => any
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'No token provided' });
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!); 
			(req as AuthenticatedRequest).userId = (decoded as any).id; 

			return handler(req as AuthenticatedRequest, res);
		} catch (err) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
	};
}
