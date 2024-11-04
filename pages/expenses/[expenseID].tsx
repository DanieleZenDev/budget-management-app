import BudgetForm from "@/components/budget-form";
import { expensesCategory } from "@/helpers/applicationData";
import {
	deleteExpenseById,
	getExpenseById,
	getExpensesData,
} from "@/helpers/auth";
import { ExpensesData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

const ExpenseDetailsPage = ({
	expenseData,
}: {
	expenseData: { expensesData: ExpensesData };
}) => {
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const router = useRouter();
	const selectedExpense = expenseData.expensesData;

	const deleteExpenseByIdFunction = async () => {
		try {
			await deleteExpenseById(parseInt(String(selectedExpense.id)));
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

export const getStaticPaths: GetStaticPaths = async () => {
	const allExpenses = await getExpensesData();

	const paths = allExpenses.expensesData.map((expense: ExpensesData) => ({
		params: { expenseID: expense.id?.toString() },
	}));

	return {
		paths,
		//fallback: false,
		fallback:'blocking'
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const expenseID = params.expenseID;
	const expenseData = await getExpenseById(parseInt(String(expenseID)));

	return {
		props: {
			expenseData,
		},
	};
};

export default ExpenseDetailsPage;
