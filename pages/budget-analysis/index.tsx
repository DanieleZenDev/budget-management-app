import BudgetGraphsPage from "@/components/budgetGraphs";
import FilterSearch from "@/components/filter-search";
import {
	getExpensesData,
	getIncomesData,
	getSavingsData,
} from "@/helpers/auth";
import { ExpensesData, IncomesData, SavingsData } from "@/types";
import { Fragment } from "react";

type BudgetAnalysisPageProps = {
	expenses: {
		expensesData: ExpensesData[];
	};
	incomes: {
		incomesData: IncomesData[];
	};
	savings: {
		savingsData: SavingsData[];
	};
};

const BudgetAnalysisPage = ({
	expenses,
	incomes,
	savings,
}: BudgetAnalysisPageProps) => {
	return (
		<Fragment>
			<FilterSearch />
			<BudgetGraphsPage
				expenses={expenses}
				incomes={incomes}
				savings={savings}
			/>
		</Fragment>
	);
};
export async function getStaticProps() {
	const expenses = await getExpensesData();
	const incomes = await getIncomesData();
	const savings = await getSavingsData();

	return {
		props: {
			expenses: expenses || [],
			incomes: incomes || [],
			savings: savings || [],
		},
	};
}

export default BudgetAnalysisPage;
