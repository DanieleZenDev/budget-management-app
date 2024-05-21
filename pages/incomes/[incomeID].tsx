import BudgetForm from "@/components/budget-form";
import {
	deleteIncomeById,
	getIncomeById,
	getIncomesData,
} from "@/helpers/auth";
import { IncomesData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

const IncomeDetailsPage = ({
	incomeData,
}: {
	incomeData: { incomesData: IncomesData };
}) => {
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const selectedIncome = incomeData.incomesData;
	const incomesCategory = [
		"Stipendio",
		"Crediti",
		"Lavori occasionali",
		"Prestiti",
		"Rimborsi",
	];
	console.log("INC", selectedIncome);
	const router = useRouter();
	const deleteIncomeByIdFunction = async () => {
		try {
			await deleteIncomeById(parseInt(String(selectedIncome.id)));
			router.push("/incomes");
		} catch (error) {
			console.error("Error deleting income:", error);
		}
	};
	return (
		<Fragment>
			<Head>
				<title>Selected income detail</title>
				<meta name="description" content="further details about my income"/>
			</Head>
		<div className="bg-cyan-600 rounded-md flex flex-col gap-3 items-center">
			<h1 className="font-serif">
				Income : <strong>{selectedIncome.Income}</strong>
			</h1>
			<p className="font-serif">
				This Income is from <strong>{selectedIncome.Month} </strong> in
				<strong>{selectedIncome.Year}</strong>
			</p>
			<button onClick={() => setShowUpdateForm(!showUpdateForm)}>
				Update this Income
			</button>
			<button onClick={deleteIncomeByIdFunction}>Delete this income</button>
			{showUpdateForm && (
				<BudgetForm
					categoryList={incomesCategory}
					category="incomes"
					operationType="income"
					importAmount="incomeImport"
					formTitle="Incomes form"
					dataEntryType="Update"
					dynamicId={selectedIncome.id}
					selectedincomesById={selectedIncome}
				/>
			)}
		</div>
		</Fragment>
		
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
