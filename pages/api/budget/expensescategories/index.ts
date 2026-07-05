import verifyToken from "@/pages/middlewares/verifyUserToken";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

const prisma = new PrismaClient();

type ResponseType = {
	message: string;
	categories?: string[];
};

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>,
) {
	try {
		if (req.method !== "GET") {
			return res.status(405).json({ message: "Method not allowed" });
		}

		const userId = req.userId.id;
		const type = req.query.type as string;

		let categories: { Category: string }[] = [];

		switch (type) {
			case "Expenses":
				categories = await prisma.expenses.findMany({
					where: { UserId: userId },
					select: { Category: true },
					distinct: ["Category"],
				});
				break;

			case "Incomes":
				categories = await prisma.incomes.findMany({
					where: { UserId: userId },
					select: { Category: true },
					distinct: ["Category"],
				});
				break;

			case "Savings":
				categories = await prisma.savings.findMany({
					where: { UserId: userId },
					select: { Category: true },
					distinct: ["Category"],
				});
				break;

			default:
				return res.status(400).json({
					message: "Invalid type. Use EXPENSE, INCOME or SAVING",
				});
		}

		const cleaned = categories.map((c) => c.Category);

		return res.status(200).json({
			message: "Categories fetched successfully",
			categories: cleaned,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
}

export default verifyToken(handler);
