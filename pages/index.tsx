import BudgetGraphsPage from "@/components/budgetGraphs";
import FilterSearch from "@/components/filter-search";
import {
	getExpensesData,
	getIncomesData,
	getSavingsData,
} from "@/helpers/auth";
import { ExpensesData, IncomesData, SavingsData } from "@/types";
import { GetSessionParams, getSession } from "next-auth/react";
import Head from "next/head";
import { Fragment, useState } from "react";

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
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
	const [selectedYear, setSelectedYear] = useState<number | null>(null);

	const handleFilterChange = (month: string, year: number) => {
		setSelectedMonth(month);
		setSelectedYear(year);
	};
	return (
		<Fragment>
			<Head>
				<title>Budget analysis page</title>
				<meta
					name="description"
					content="graphs about expenses, incomes and savings"
				/>
			</Head>
			<FilterSearch onFilterChange={handleFilterChange} />
			{selectedYear && selectedMonth && (
				<BudgetGraphsPage
					expenses={expenses}
					incomes={incomes}
					savings={savings}
					SelectedMonth={selectedMonth}
					SelectedYear={selectedYear}
				/>
			)}
		</Fragment>
	);
};
// export async function getServerSideProps(context: GetSessionParams | undefined) {
//     const session = await getSession(context);

//     if (!session || !session.accessToken) {
//         return {
//             redirect: {
//                 destination: '/auth',
//                 permanent: false,
//             },
//         };
//     }

//     const allExpenses = await getExpensesData(session?.accessToken);
// 	const allIncomes = await getIncomesData(session?.accessToken);
// 	const allSavings = await getSavingsData(session?.accessToken);

//     return {
//         props: { 
// 			expenses: allExpenses,
// 			incomes:allIncomes,
// 			savings:allSavings 
// 		},
//     };
// }

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
