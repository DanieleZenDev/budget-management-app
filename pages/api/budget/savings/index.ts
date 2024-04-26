import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { SavingsData } from "@/types";
const prisma = new PrismaClient();
type Savings = {
	message: string;
	savingsData?: SavingsData | SavingsData[];
};
async function handler(req: NextApiRequest, res: NextApiResponse<Savings>) {
	const { Category, Saving, Import, Month, Year, User } = req.body;
	try {
		if (req.method === "POST") {
			const enteredSaving = await prisma.savings.create({
				data: {
					Category,
					Saving,
					Import,
					Month,
					Year,
					User,
				},
			});
			res.status(201).json({
				message: "savings data passed successfully",
				savingsData: enteredSaving,
			});
		} else if (req.method === "GET") {
			try {
				const allSavings = await prisma.savings.findMany({
					orderBy: {
						id: "desc",
					},
				});
				console.log("all incomes", allSavings);
				if (allSavings) {
					res.status(201).json({
						message: "all expenses data retrieved correctly",
						savingsData: allSavings,
					});
				}
			} catch (error) {
				console.error("Error in passing the savings data:", error);
				return res.status(500).json({
					message: "Internal server error - - could not get the savings data",
				});
			}
		}
	} catch (error) {
		console.error("Error in passing the savings data:", error);
		return res.status(500).json({
			message: "Internal server error - could not pass the savings data",
		});
	}
}
export default handler;
