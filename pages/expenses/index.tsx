import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { getExpensesData } from "@/helpers/auth";
import { ExpensesData } from "@/types";
import Link from "next/link";
import { useState } from "react";

type PageProps = {
	expenses: {
		expensesData: ExpensesData[];
	};
};

const ExpensesPage = (props: PageProps) => {
	const { expensesData } = props.expenses;

	const [visibleExpenses, setVisibleExpenses] = useState(10);
	const expensesPerPage = 10;

	const loadMoreExpenses = () => {
		setVisibleExpenses(
			(prevVisibleExpenses) => prevVisibleExpenses + expensesPerPage
		);
	};
	const hideExpenses = () => {
		setVisibleExpenses((prevVisibleExpenses) =>
			Math.max(0, prevVisibleExpenses - expensesPerPage)
		);
	};
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
		<div>
			<section className="flex justify-center">
				<BudgetForm
					categoryList={expensesCategory}
					category="expenses"
					operationType="expense"
					importAmount="expenseImport"
					formTitle="Expenses form"
				/>
				<div className="flex flex-wrap gap-4">
					{expensesData.slice(0, visibleExpenses).map((expense, index) => (
						<Link key={index} href={`/expenses/${expense.id}`}>
							<BudgetDataPanel
								budgetCategory={expense.Category}
								user={expense.User}
								budgetImport={expense.Import}
							/>
						</Link>
					))}
					<div className="flex flex-col gap-1">
						{expensesData.length > visibleExpenses && (
							<button onClick={loadMoreExpenses}>Mostra altre spese</button>
						)}
						{visibleExpenses > expensesPerPage && (
							<button onClick={hideExpenses}>Nascondi 10 spese</button>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export async function getStaticProps() {
	const allExpenses = await getExpensesData();
	const allExpensesToPass = allExpenses || [];

	return {
		props: { expenses: allExpensesToPass },
	};
}

export default ExpensesPage;
