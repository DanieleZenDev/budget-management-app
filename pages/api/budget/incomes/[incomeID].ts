import verifyToken from "@/pages/middlewares/verifyUserToken";
import { IncomesData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
type Incomes = {
	message: string;
	incomesData?: IncomesData | IncomesData[];
};
async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Incomes>
) {
	const { incomeID }: any = req.query;
	const userId = req.userId.id;
	
	if (req.method === "GET") {
		try {
			if (incomeID !== undefined) {
				const income = await prisma.incomes.findUnique({
					where: {
						id: parseInt(incomeID),
						UserId:userId
					},
				});

				if (income) {
					res.status(200).json({
						message: "Income has been retrieved correctly by its id",
						incomesData: income,
					});
				} else {
					res.status(404).json({ message: "Income not found" });
				}
			} else {
				res.status(400).json({ message: "Invalid income ID" });
			}
		} catch (error) {
			console.error("Error fetching incomes:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else if (req.method === "PUT") {
		try {
			const { Category, Income, Import, Month, Year, User } = req.body;
			const updatedIncome = await prisma.incomes.update({
				where: {
					id: parseInt(incomeID),
					UserId:userId
				},
				data: {
					Income,
					Import,
					Category,
					Month,
					Year,
					User,
				},
			});
			if (updatedIncome) {
				res.status(200).json({
					message: "Income updated successfully",
					incomesData: updatedIncome,
				});
			} else {
				res.status(404).json({ message: "Income not found" });
			}
		} catch (error) {
			console.error("Error updating income:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else if (req.method === "DELETE") {
		try {
			const incomeToDelete = await prisma.incomes.delete({
				where: {
					id: parseInt(incomeID),
					UserId:userId
				},
			});
			if (incomeToDelete) {
				return res.status(200).json({
					message: "Income deleted successfully",
				});
			} else {
				return res.status(404).json({ message: "Income not found" });
			}
		} catch (error) {
			console.error("Error deleting income:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}

export default verifyToken(handler);