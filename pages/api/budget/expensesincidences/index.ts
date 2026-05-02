import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import verifyToken from "@/pages/middlewares/verifyUserToken";

const prisma = new PrismaClient();

type IncidenceResponse = {
	message: string;
	incidenceData?: {
		totalMonth: number;
		categoryTotal: number;
		incidencePercentage: number;
	};
};

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IncidenceResponse>,
) {
	const userId = req.userId.id;

	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	// 🔥 Query params from frontend
	const { year, month, category } = req.query;

	// ⚠️ base validation
	if (!year || !month || !category) {
		return res.status(400).json({
			message: "Missing required query params: year, month, and category",
		});
	}

	try {
		// 📊 Get total for the entire month
		const monthExpenses = await prisma.expenses.findMany({
			where: {
				UserId: userId,
				Year: Number(year),
				Month: String(month),
			},
		});

		const totalMonth = monthExpenses.reduce(
			(sum, expense) => sum + Number(expense.Import),
			0,
		);

		// 📊 Get total for the specific category in that month
		const categoryExpenses = await prisma.expenses.findMany({
			where: {
				UserId: userId,
				Year: Number(year),
				Month: String(month),
				Category: String(category),
			},
		});

		const categoryTotal = categoryExpenses.reduce(
			(sum, expense) => sum + Number(expense.Import),
			0,
		);

		// 📊 Calculate incidence percentage
		const incidencePercentage =
			totalMonth > 0 ? (categoryTotal / totalMonth) * 100 : 0;

		return res.status(200).json({
			message: "Incidence data retrieved correctly",
			incidenceData: {
				totalMonth,
				categoryTotal,
				incidencePercentage,
			},
		});
	} catch (error) {
		console.error("Error fetching incidence data:", error);
		return res.status(500).json({
			message: "Internal server error",
		});
	}
}

export default verifyToken(handler);
