import verifyToken from "@/pages/middlewares/verifyUserToken";
import { IncomesData } from "@/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextApiRequest, NextApiResponse } from "next";
type Incomes = {
	message: string;
	incomesData?: IncomesData | IncomesData[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Incomes>) {
	const { Category, Income, Import, Month, Year, User } = req.body;
	const userId = req.userId.id;

	if (req.method === "POST") {
		try {
			const enteredIncome = await prisma.incomes.create({
				data: {
					Category,
					Income,
					Import,
					Month,
					Year,
					User,
					UserId:userId
				},
			});
			res.status(201).json({
				message: "incomes data passed successfully",
				incomesData: enteredIncome,
			});
		} catch (error) {
			console.error("Error in passing the incomes data:", error);
			return res.status(500).json({
				message: "Internal server error - could not pass the incomes data",
			});
		}
	} else if (req.method === "GET") {
		const months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const currentMonth = months[new Date().getMonth()];
		try {
			const allIncomes = await prisma.incomes.findMany({
				where: {
                    UserId: userId,
					Month:currentMonth
                },
				orderBy: {
					id: "desc",
				},
			});
			if (allIncomes) {
				res.status(201).json({
					message: "all expenses data retrieved correctly",
					incomesData: allIncomes,
				});
			}
		} catch (error) {
			console.error("Error in passing the incomes data:", error);
			return res.status(500).json({
				message: "Internal server error - - could not get the incomes data",
			});
		}
	}
}
export default verifyToken(handler);

