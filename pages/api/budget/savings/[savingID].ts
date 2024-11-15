import verifyToken from "@/pages/middlewares/verifyUserToken";
import { SavingsData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
type Savings = {
	message: string;
	savingsData?: SavingsData | SavingsData[];
};
async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Savings>
) {
	const { savingID }: any = req.query;
	const userId = req.userId.id;
	
	if (req.method === "GET") {
		try {
			if (savingID !== undefined) {
				const saving = await prisma.savings.findUnique({
					where: {
						id: parseInt(savingID),
						UserId:userId
					},
				});

				if (saving) {
					res.status(200).json({
						message: "Saving has been retrieved correctly by its id",
						savingsData: saving,
					});
				} else {
					res.status(404).json({ message: "Saving not found" });
				}
			} else {
				res.status(400).json({ message: "Invalid saving ID" });
			}
		} catch (error) {
			console.error("Error fetching savings:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else if (req.method === "PUT") {
		try {
			const { Category, Saving, Import, Month, Year, User } = req.body;
			const updatedSaving = await prisma.savings.update({
				where: {
					id: parseInt(savingID),
					UserId:userId
				},
				data: {
					Saving,
					Import,
					Category,
					Month,
					Year,
					User,
				},
			});
			if (updatedSaving) {
				res.status(200).json({
					message: "Saving updated successfully",
					savingsData: updatedSaving,
				});
			} else {
				res.status(404).json({ message: "Saving not found" });
			}
		} catch (error) {
			console.error("Error updating saving:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else if (req.method === "DELETE") {
		try {
			const savingToDelete = await prisma.savings.delete({
				where: {
					id: parseInt(savingID),
					UserId:userId
				},
			});
			if (savingToDelete) {
				return res.status(200).json({
					message: "Saving deleted successfully",
				});
			} else {
				return res.status(404).json({ message: "Saving not found" });
			}
		} catch (error) {
			console.error("Error deleting saving:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}
export default verifyToken(handler);