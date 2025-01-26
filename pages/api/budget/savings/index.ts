import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { SavingsData } from "@/types";
import verifyToken from "@/pages/middlewares/verifyUserToken";
const prisma = new PrismaClient();
type Savings = {
	message: string;
	savingsData?: SavingsData | SavingsData[];
};
async function handler(req: NextApiRequest, res: NextApiResponse<Savings>) {
	const { Category, Saving, Import, Month, Year, User } = req.body;
	const userId = req.userId.id;

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
					UserId:userId
				},
			});
	
			res.status(201).json({
				message: "savings data passed successfully",
				savingsData: enteredSaving,
			});
		} else if (req.method === "GET") {
			const months = [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			const currentMonth = months[new Date().getMonth()];
			const currentYear = new Date().getFullYear();

			try {
				const allSavings = await prisma.savings.findMany({
					where: {
						UserId: userId,
						Month:currentMonth,
						Year:currentYear
					},
					orderBy: {
						id: "desc",
					},
				});
			
				if (allSavings) {
					res.status(201).json({
						message: "all savings data retrieved correctly",
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

export default verifyToken(handler);
