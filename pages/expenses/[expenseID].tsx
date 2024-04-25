import { getExpenseById } from "@/helpers/auth";
import { ExpensesData } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ExpenseDetailsPage = () => {
	const [selectedExpense, setSelectedExpense] = useState<{
		expensesData: ExpensesData;
	}>();
	const router = useRouter();
	const expenseIDparam = router.query.expenseID;
	const expenseIDparamN = parseInt(String(expenseIDparam));
	console.log("expenseIDparam", expenseIDparam);

	useEffect(() => {
		const retrieveExpenseById = async () => {
			const data = await getExpenseById(expenseIDparamN);
			console.log("data", data);
			setSelectedExpense(data);
		};
		retrieveExpenseById();
	}, [expenseIDparamN]);
	console.log("se", selectedExpense?.expensesData);
	const selectedExpensesById = selectedExpense?.expensesData;
	return (
		<div className="bg-cyan-600  rounded-md flex flex-col gap-3 items-center ">
			<h1 className="font-serif">
				Expense : <strong>{selectedExpensesById?.Expense}</strong>
			</h1>
			<p className="font-serif">
				This expense was made in <strong>{selectedExpensesById?.Month} </strong>
				in
				<strong>{selectedExpensesById?.Year}</strong>
			</p>
		</div>
	);
};

export default ExpenseDetailsPage;
