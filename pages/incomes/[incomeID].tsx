import { getIncomeById, getIncomesData } from "@/helpers/auth";
import { IncomesData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";

const IncomeDetailsPage = ({
	incomeData,
}: {
	incomeData: { incomesData: IncomesData };
}) => {
	const selectedIncome = incomeData.incomesData;
	console.log("INC", selectedIncome);
	return (
		<div className="bg-cyan-600 rounded-md flex flex-col gap-3 items-center">
			<h1 className="font-serif">
				Income : <strong>{selectedIncome.Income}</strong>
			</h1>
			<p className="font-serif">
				This Income is from <strong>{selectedIncome.Month} </strong> in
				<strong>{selectedIncome.Year}</strong>
			</p>
		</div>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allIncomes = await getIncomesData();

	const paths = allIncomes.incomesData.map((income: IncomesData) => ({
		params: { incomeID: income.id?.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const incomeID = params.incomeID;
	const incomeData = await getIncomeById(parseInt(String(incomeID)));

	return {
		props: {
			incomeData,
		},
	};
};

export default IncomeDetailsPage;
