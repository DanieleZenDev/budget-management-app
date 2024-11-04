import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ExpensesData } from "@/types";
import verifyToken from "@/pages/middlewares/verifyUserToken";
const prisma = new PrismaClient();
type Expenses = {
	message: string;
	expensesData?: ExpensesData | ExpensesData[];
};
async function handler(req: NextApiRequest, res: NextApiResponse<Expenses>) {
	const userId = req.userId.id;
	
	if (req.method === "POST") {
		const { Category, Expense, Import, Month, Year, User } = req.body;
		
		try {
			
			const enteredExpenses = await prisma.expenses.create({
				data: {
					Category,
					Expense,
					Import,
					Month,
					Year,
					User,
					UserId:userId
				},
			});
			res.status(201).json({
				message: "expenses data passed successfully",
				expensesData: enteredExpenses,
			});
		} catch (error) {
			console.error("Error in passing the expenses data:", error);
			return res.status(500).json({
				message: "Internal server error - could not pass the expenses data",
			});
		}
	} else if (req.method === "GET") {
		try {
			const allExpenses = await prisma.expenses.findMany({
				where: {
                    UserId: userId, 
                },
				orderBy: {
					id: "desc",
				},
			});

			if (allExpenses) {
				return res.status(200).json({
					message: "all expenses data retrieved correctly",
					expensesData: allExpenses,
				});
			}
		} catch (error) {
			console.error("Error in passing the expenses data:", error);
			return res.status(500).json({
				message: "Internal server error - could not get the expenses data",
			});
		}
	}
}

export default verifyToken(handler);