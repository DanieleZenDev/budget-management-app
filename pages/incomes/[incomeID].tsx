import BudgetForm from "@/components/budget-form";
import { incomesCategory } from "@/helpers/applicationData";
import {
	deleteIncomeById,
	getIncomeById
} from "@/helpers/auth";
import { IncomesData } from "@/types";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

interface IncomesDataForSpecificDynamicId {
	incomeData:{ incomesData: IncomesData },
	token:string | undefined
}

const IncomeDetailsPage = ({
	incomeData,
	token
}: IncomesDataForSpecificDynamicId) => {
	
	if (!incomeData || !incomeData.incomesData) {
        return <p>Loading...</p>;  
    }
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const selectedIncome = incomeData.incomesData;

	const router = useRouter();
	const deleteIncomeByIdFunction = async () => {
		try {
			await deleteIncomeById(parseInt(String(selectedIncome.id)), token);
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

export async function getServerSideProps(context: GetServerSidePropsContext | undefined) {
    const session = await getSession(context);

    if (!session || !session.accessToken) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
	const { incomeID } = context?.params || {}; 

    if (!incomeID) {
        return {
            notFound: true, 
        };
    }

    const allIncomes = await getIncomeById(parseInt(String(incomeID)), session?.accessToken);
	
    const allIncomesToPass = allIncomes || [];

    return {
        props: { incomeData:  allIncomesToPass, token:session?.accessToken },
    };
}

export default IncomeDetailsPage;
