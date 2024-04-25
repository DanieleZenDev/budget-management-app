import { IncomesData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
type Incomes = {
	message: string;
	incomesData?: IncomesData | IncomesData[];
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Incomes>
) {
	const { incomeID }: any = req.query;
	console.log("INC id", incomeID);
	if (req.method === "GET") {
		try {
			if (incomeID !== undefined) {
				const income = await prisma.incomes.findUnique({
					where: {
						id: parseInt(incomeID),
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
	}
}
