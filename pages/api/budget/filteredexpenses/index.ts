import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ExpensesData } from "@/types";
import verifyToken from "@/pages/middlewares/verifyUserToken";

const prisma = new PrismaClient();

type Expenses = {
	message: string;
	expensesData?: ExpensesData[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Expenses>) {
	const userId = req.userId.id;

	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	// 🔥 Query params from frontend
	const { category, year } = req.query;

	// ⚠️ base validation
	if (!category || !year) {
		return res.status(400).json({
			message: "Missing required query params: category and year",
		});
	}

	try {
		const filteredExpenses = await prisma.expenses.findMany({
			where: {
				UserId: userId,
				Category: String(category),
				Year: Number(year),
			},
			orderBy: {
				id: "desc",
			},
		});

		const filteredExpensesConverted = filteredExpenses.map((expense) => ({
			...expense,
			Import: Number(expense.Import),
		}));

		return res.status(200).json({
			message: "Filtered expenses retrieved correctly",
			expensesData: filteredExpensesConverted,
		});
	} catch (error) {
		console.error("Error fetching filtered expenses:", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
}

export default verifyToken(handler);
