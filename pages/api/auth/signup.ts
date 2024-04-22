import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/helpers/auth";
import { UserData } from "@/types";

const prisma = new PrismaClient();

type Data = {
	message: string;
	userdata?: UserData;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method === "POST") {
		const { Email, Password } = req.body;
		console.log("em", Email, "psw", Password);

		if (!Email) {
			return res.status(422).json({ message: "No email found" });
		} else if (!Email.includes("@")) {
			return res.status(422).json({ message: "Email must include a @ symbol" });
		} else if (!Password) {
			return res.status(422).json({ message: "No password found" });
		} else if (Password.length < 8) {
			return res
				.status(422)
				.json({ message: "Password should have at least 8 characters" });
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
					Email: Email,
					Password: hashedPassword,
				},
			});

			return res
				.status(201)
				.json({ message: "Created the user", userdata: userData });
		} catch (error) {
			console.error("Error creating user:", error);
			return res.status(500).json({ message: "Internal server error" });
		}
	} else {
		return res.status(405).json({ message: "Method Not Allowed" });
	}
}

export default handler;
