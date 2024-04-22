import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { getExpensesData } from "@/helpers/auth";
import { ExpensesData } from "@/types";

const ExpensesPage = (props: ExpensesData[]) => {
	console.log("p", props);

	const expensesCategory = [
		"Affitto",
		"alimentari",
		"bollette",
		"trasporti",
		"ristoranti",
		"abbonamenti",
		"libri/fumetti",
		"vacanze",
		"sport",
		"svago",
	];
	return (
		<div>
			<section className="flex justify-center">
				<BudgetForm
					categoryList={expensesCategory}
					category="expenses"
					operationType="expense"
					importAmount="expenseImport"
					formTitle="Expenses form"
				/>
				<BudgetDataPanel
					budgetCategory="Rent"
					user="Daniele"
					budgetImport={450}
				/>
			</section>
		</div>
	);
};

export async function getStaticProps() {
	console.log("ok");
	const allExpenses = await getExpensesData();
	const allExpensesToPass = allExpenses || [];
	return {
		props: { expenses: allExpensesToPass },
	};
}
export default ExpensesPage;
