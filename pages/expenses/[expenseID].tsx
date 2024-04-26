import BudgetForm from "@/components/budget-form";
import { getExpenseById, getExpensesData } from "@/helpers/auth";
import { ExpensesData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";

const ExpenseDetailsPage = ({
	expenseData,
}: {
	expenseData: { expensesData: ExpensesData };
}) => {
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const selectedExpense = expenseData.expensesData;
	console.log("exdp", selectedExpense);
	const expensesCategory = [
		"Affitto",
		"alimentari",
		"bollette",
		"trasporti",
		"ristoranti",
		"abbonamenti",
		"abbigliamento",
		"offerta telefonica",
		"formazione",
		"debiti",
		"tecnologia",
		"salute",
		"cura personale",
		"spese di casa",
		"regali",
		"libri/fumetti",
		"vacanze",
		"sport",
		"svago",
	];
	return (
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
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allExpenses = await getExpensesData();

	const paths = allExpenses.expensesData.map((expense: ExpensesData) => ({
		params: { expenseID: expense.id?.toString() },
	}));

	return {
		paths,
		fallback: false,
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
