import { NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";

export default function verifyToken(
	handler: (arg0: NextApiRequest, arg1: NextApiResponse) => any,
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}
		const secret = process.env.JWT_SECRET;
		if (!secret) {
			throw new Error("JWT_SECRET is not defined in environment variables");
		}

		try {
			const secretKey = new TextEncoder().encode(secret);
			const { payload } = await jwtVerify(token, secretKey);
			req.userId = payload;

			return handler(req, res);
		} catch (err) {
			return res.status(401).json({ message: "Unauthorized" });
		}
	};
}
