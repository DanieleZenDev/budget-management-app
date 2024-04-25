import { getExpenseById, getExpensesData } from "@/helpers/auth";
import { ExpensesData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";

const ExpenseDetailsPage = ({
	expenseData,
}: {
	expenseData: { expensesData: ExpensesData };
}) => {
	const selectedExpense = expenseData.expensesData;
	console.log("exdp", selectedExpense);
	return (
		<div className="bg-cyan-600 rounded-md flex flex-col gap-3 items-center">
			<h1 className="font-serif">
				Expense : <strong>{selectedExpense.Expense}</strong>
			</h1>
			<p className="font-serif">
				This expense was made in <strong>{selectedExpense.Month} </strong> in
				<strong>{selectedExpense.Year}</strong>
			</p>
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
