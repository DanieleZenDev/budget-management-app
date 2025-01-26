import verifyToken from "@/pages/middlewares/verifyUserToken";
import { ExpensesData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

const prisma = new PrismaClient();

type Expenses = {
	message: string;
	expensesData?: ExpensesData | ExpensesData[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Expenses>){
    const userId = req.userId.id;
	try {
		if(req.method === 'GET'){
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
	} catch (error) {
		console.error("Error in passing the expenses data:", error);
			return res.status(500).json({
				message: "Internal server error - could not get the expenses data",
		});
	}
    
}
export default verifyToken(handler);