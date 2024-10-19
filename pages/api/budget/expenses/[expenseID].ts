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
	} else if (req.method === "PUT") {
		try {
			const { Category, Expense, Import, Month, Year, User } = req.body;
			const updatedExpense = await prisma.expenses.update({
				where: {
					id: parseInt(expenseID),
				},
				data: {
					Expense,
					Import,
					Category,
					Month,
					Year,
					User,
				},
			});
			if (updatedExpense) {
				res.status(200).json({
					message: "Expense updated successfully",
					expensesData: updatedExpense,
				});
			} else {
				res.status(404).json({ message: "Expense not found" });
			}
		} catch (error) {
			console.error("Error updating expense:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else if (req.method === "DELETE") {
		try {
			const expenseToDelete = await prisma.expenses.delete({
				where: {
					id: parseInt(expenseID),
				},
			});
			if (expenseToDelete) {
				return res.status(200).json({
					message: "Expense deleted successfully",
				});
			} else {
				return res.status(404).json({ message: "Expense not found" });
			}
		} catch (error) {
			console.error("Error deleting expense:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}
