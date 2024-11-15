import BudgetForm from "@/components/budget-form";
import { expensesCategory } from "@/helpers/applicationData";
import {
	deleteExpenseById,
	getExpenseById,
} from "@/helpers/auth";
import { ExpensesData } from "@/types";
import { GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

interface ExpensesDataForSpecificDynamicId {
	expenseData:{ expensesData: ExpensesData },
	token:string | undefined
}
const ExpenseDetailsPage = ({
	expenseData,
	token
}:ExpensesDataForSpecificDynamicId) => {

	if (!expenseData || !expenseData.expensesData) {
        return <p>Loading...</p>;  
    }
	
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const router = useRouter();
	const selectedExpense = expenseData.expensesData;

	const deleteExpenseByIdFunction = async () => {
		try {
			await deleteExpenseById(parseInt(String(selectedExpense.id)), token);
			router.push("/expenses");
		} catch (error) {
			console.error("Error deleting expense:", error);
		}
	};
	return (
		<Fragment>
			<Head>
				<title>Selected expense detail</title>
				<meta name="description" content="further details about my expense"/>
			</Head>
		<div className="bg-cyan-600 rounded-md flex flex-col gap-3 items-center">
			<h1 className="font-serif">
				Expense : <strong>{selectedExpense.Expense}</strong> Import:{" "}
				<strong>{selectedExpense.Import}</strong>
			</h1>
			<p className="font-serif">
				This expense was made in <strong>{selectedExpense.Month} </strong> in
				<strong>{selectedExpense.Year}</strong>
			</p>
			<button onClick={() => setShowUpdateForm(!showUpdateForm)}>
				Update this expense
			</button>
			<button onClick={deleteExpenseByIdFunction}>Delete this expense</button>
			{showUpdateForm && (
				<BudgetForm
					categoryList={expensesCategory}
					category="expenses"
					operationType="expense"
					importAmount="expenseImport"
					formTitle="Expenses form"
					dataEntryType="Update"
					dynamicId={selectedExpense.id}
					selectedExpenseById={selectedExpense}
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
	const { expenseID } = context?.params || {}; 

    if (!expenseID) {
        return {
            notFound: true, 
        };
    }

    const allExpenses = await getExpenseById(parseInt(String(expenseID)), session?.accessToken);
	
    const allExpensesToPass = allExpenses || [];

    return {
        props: { expenseData: allExpensesToPass, token:session?.accessToken },
    };
}

export default ExpenseDetailsPage;
