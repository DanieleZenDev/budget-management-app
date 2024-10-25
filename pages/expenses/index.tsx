import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { getExpensesData } from "@/helpers/auth";
import { ExpensesData } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";

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
		"spese burocratiche",
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
		"auto",
		"alloggi"
	];

	return (
		<Fragment>
			<Head>
				<title>All expenses list page</title>
				<meta name="description" content="a list of all expenses" />
			</Head>
			<div>
				<section className="flex flex-col justify-center gap-4">
					<BudgetForm
						categoryList={expensesCategory}
						category="expenses"
						operationType="expense"
						importAmount="expenseImport"
						formTitle="Expenses form"
						dataEntryType="Post"
					/>
					<div className="flex flex-wrap gap-4">
						
						{expensesData.slice(0, visibleExpenses).map((expense, index) => (
							<div>
								<Link key={index} href={`/expenses/${expense.id}`}>
									<BudgetDataPanel
										budgetCategory={expense.Category}
										user={expense.User}
										budgetImport={expense.Import}
										budgetOperation={expense.Expense}
									/>
								</Link>
							</div>
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
		</Fragment>
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
