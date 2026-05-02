import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import verifyToken from "@/pages/middlewares/verifyUserToken";

const prisma = new PrismaClient();

type PieData = {
	Category: string;
	total: number;
};

type ExpensesPieData = {
	message: string;
	expensesData?: PieData[];
};

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ExpensesPieData>,
) {
	const userId = req.userId.id;

	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	// 🔥 Query params from frontend
	const { year, month } = req.query;

	// ⚠️ base validation
	if (!month || !year) {
		return res.status(400).json({
			message: "Missing required query params: category and year",
		});
	}

	try {
		const expensesDataByCategoryForYearAndMonth = await prisma.expenses.groupBy(
			{
				by: ["Category"],
				where: {
					UserId: userId,
					Year: Number(year),
					Month: String(month),
				},
				_sum: {
					Import: true,
				},
			},
		);
		const expensesDataByCategoryForYearAndMonthConverted =
			expensesDataByCategoryForYearAndMonth.map((expense) => ({
				Category: expense.Category,
				total: Number(expense._sum.Import ?? 0),
			}));

		return res.status(200).json({
			message: "Filtered expenses retrieved correctly",
			expensesData: expensesDataByCategoryForYearAndMonthConverted,
		});
	} catch (error) {
		console.error("Error fetching filtered expenses:", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
}

export default verifyToken(handler);
