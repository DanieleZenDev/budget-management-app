import { SavingsData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
type Savings = {
	message: string;
	savingsData?: SavingsData | SavingsData[];
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Savings>
) {
	const { savingID }: any = req.query;
	console.log("INC id", savingID);
	if (req.method === "GET") {
		try {
			if (savingID !== undefined) {
				const saving = await prisma.savings.findUnique({
					where: {
						id: parseInt(savingID),
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
	}
}
