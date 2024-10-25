import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/helpers/auth";
import { UserData } from "@/types";
import { sign } from 'jsonwebtoken';
const prisma = new PrismaClient();

type Data = {
	message: string | string[];
	userdata?: UserData;
	accessToken?:string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method === "POST") {
		const { Name, Email, Password } = req.body;
	
		const errors: string[] = [];

		if (!Email) {
			errors.push("No email found");
		}
		if (Email && !Email.includes("@")) {
			errors.push("Email must include a @ symbol");
		}
		if (!Password) {
			errors.push("No password found");
		}
		if (Password && Password.length < 8) {
			errors.push("Password should have at least 8 characters");
		}
		if (!Name) {
			errors.push("No name found");
		}

		if (errors.length > 0) {
			console.log("Validation Errors:", errors);
			return res.status(422).json({ message: errors });
		}

		const hashedPassword = await hashPassword(Password);

		try {
			const existingUser = await prisma.user.findFirst({
				where: { Email: Email },
			});
			if (existingUser) {
				return res.status(422).json({ message: "User already exists" });
			}

			const userData = await prisma.user.create({
				data: {
					Name:Name,
					Email: Email,
					Password: hashedPassword,
				},
			});
			const accessToken = sign({ id: userData.id, email: userData.Email, password:userData.Password, name:userData.Name }, 'your_super_secret_jwt_key', { expiresIn: '30m' });
			
			return res	
				.status(201)
				.json({ message: "Created the user", userdata: userData, accessToken});
		} catch (error) {
			console.error("Error creating user:", error);
			return res.status(500).json({ message: "Internal server error" });
		}
	} else {
		return res.status(405).json({ message: "Method Not Allowed" });
	}
}

export default handler;
