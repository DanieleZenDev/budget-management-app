import verifyToken from "@/pages/middlewares/verifyUserToken";
import { SavingsData } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";
const prisma = new PrismaClient();

type Savings = {
	message: string;
	savingsData?: SavingsData | SavingsData[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Savings>){
    const userId = req.userId.id;
    try {
        if(req.method === 'GET'){
            try {
                const allSavings = await prisma.savings.findMany({
                    where: {
                        UserId: userId
                    },
                    orderBy: {
                        id: "desc",
                    },
                });
            
                if (allSavings) {
                    res.status(201).json({
                        message: "all savings data retrieved correctly",
                        savingsData: allSavings,
                    });
                }
            } catch (error) {
                console.error("Error in passing the savings data:", error);
                return res.status(500).json({
                    message: "Internal server error - - could not get the savings data",
                });
            }
        }
    } catch (error) {
        console.error("Error in passing the savings data:", error);
		return res.status(500).json({
			message: "Internal server error - could not pass the savings data",
		});
    }
    
}
export default verifyToken(handler);