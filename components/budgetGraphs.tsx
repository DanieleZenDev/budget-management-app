// import Plot from "react-plotly.js";
import { ExpensesData, IncomesData, SavingsData } from "@/types";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
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
	budgetForSelectedMonth: string;
	budgetForSelectedYear: number;
};

const BudgetGraphsPage = ({
	expenses,
	incomes,
	savings,
	budgetForSelectedMonth,
	budgetForSelectedYear,
}: BudgetAnalysisPageProps) => {
	const allExpenses = expenses.expensesData;
	const allIncomes = incomes.incomesData;
	const allSavings = savings.savingsData;

	const aprilExpenses = allExpenses.filter(
		(expense) =>
			expense.Month === budgetForSelectedMonth &&
			expense.Year === budgetForSelectedYear
	);
	const expensesCategories = aprilExpenses.map((expense) => expense.Category);
	const expensesImports = aprilExpenses.map((expense) => expense.Import);

	const aprilIncomes = allIncomes.filter(
		(income) =>
			income.Month === budgetForSelectedMonth &&
			income.Year === budgetForSelectedYear
	);
	const incomesCategories = aprilIncomes.map((income) => income.Category);
	const incomesImports = aprilIncomes.map((income) => income.Import);

	const aprilSavings = allSavings.filter(
		(saving) =>
			saving.Month === budgetForSelectedMonth &&
			saving.Year === budgetForSelectedYear
	);
	const savingsCategories = aprilSavings.map((saving) => saving.Category);
	const savingsImports = aprilSavings.map((saving) => saving.Import);
	return (
		<div>
			<Plot
				data={[
					{
						values: expensesImports,
						labels: expensesCategories,
						type: "pie",
					},
				]}
				layout={{ width: 620, height: 440, title: "Grafico delle spese" }}
			/>
			<Plot
				data={[
					{
						values: incomesImports,
						labels: incomesCategories,
						type: "pie",
					},
				]}
				layout={{ width: 620, height: 440, title: "Grafico delle entrate" }}
			/>
			<Plot
				data={[
					{
						values: savingsImports,
						labels: savingsCategories,
						type: "pie",
					},
				]}
				layout={{ width: 620, height: 440, title: "Grafico dei risparmi" }}
			/>
		</div>
	);
};

export default BudgetGraphsPage;
