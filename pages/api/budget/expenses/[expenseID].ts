import { ExpensesData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
type Expenses = {
	message: string;
	expensesData?: ExpensesData | ExpensesData[];
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Expenses>
) {
	const { expenseID }: any = req.query;
	console.log("EXP id", expenseID);
	if (req.method === "GET") {
		try {
			if (expenseID !== undefined) {
				const expense = await prisma.expenses.findUnique({
					where: {
						id: parseInt(expenseID),
					},
				});

				if (expense) {
					res.status(200).json({
						message: "Expense has been retrieved correctly by its id",
						expensesData: expense,
					});
				} else {
					res.status(404).json({ message: "Expense not found" });
				}
			} else {
				res.status(400).json({ message: "Invalid expense ID" });
			}
		} catch (error) {
			console.error("Error fetching expense:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}
