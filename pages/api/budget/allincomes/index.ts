import verifyToken from "@/pages/middlewares/verifyUserToken";
import { IncomesData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

const prisma = new PrismaClient();

type Incomes = {
	message: string;
	incomesData?: IncomesData | IncomesData[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Incomes>){
    const userId = req.userId.id;
    try {
        if(req.method === 'GET'){
            try {
                const allIncomes = await prisma.incomes.findMany({
                    where: {
                        UserId: userId,
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
    } catch (error) {
        console.error("Error in passing the incomes data:", error);
			return res.status(500).json({
				message: "Internal server error - - could not get the incomes data",
		});
    }
    
}
export default verifyToken(handler);