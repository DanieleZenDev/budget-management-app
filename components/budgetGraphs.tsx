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

	const initialReduceValue = 0;
	const currentExpenses = allExpenses.filter(
		(expense) =>
			expense.Month === budgetForSelectedMonth &&
			expense.Year === budgetForSelectedYear
	);
	const expensesCategories = currentExpenses.map((expense) => expense.Category);
	const expensesImports = currentExpenses.map((expense) => expense.Import);

	const currentIncomes = allIncomes.filter(
		(income) =>
			income.Month === budgetForSelectedMonth &&
			income.Year === budgetForSelectedYear
	);
	const incomesCategories = currentIncomes.map((income) => income.Category);
	const incomesImports = currentIncomes.map((income) => income.Import);

	const currentSavings = allSavings.filter(
		(saving) =>
			saving.Month === budgetForSelectedMonth &&
			saving.Year === budgetForSelectedYear
	);
	const savingsCategories = currentSavings.map((saving) => saving.Category);
	const savingsImports = currentSavings.map((saving) => saving.Import);

	const currentExpensesForGiulia = currentExpenses.filter(
		(expense) => expense.User === "Giulia"
	);
	const currentExpensesForDaniele = currentExpenses.filter(
		(expense) => expense.User === "Daniele"
	);
	const totalExpenses = expensesImports.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialReduceValue
	);
	const giuliaExpenses = currentExpensesForGiulia.reduce(
		(accumulator, currentValue) => accumulator + currentValue.Import,
		initialReduceValue
	);
	const danieleExpenses = currentExpensesForDaniele.reduce(
		(accumulator, currentValue) => accumulator + currentValue.Import,
		initialReduceValue
	);

	const currentIncomesForDaniele = currentIncomes.filter(
		(income) => income.User === "Daniele"
	);
	const currentIncomesForGiulia = currentIncomes.filter(
		(income) => income.User === "Giulia"
	);
	const danieleIncomes = currentIncomesForDaniele.reduce(
		(accumulator, currentValue) => accumulator + currentValue.Import,
		initialReduceValue
	);
	const giuliaIncomes = currentIncomesForGiulia.reduce(
		(accumulator, currentValue) => accumulator + currentValue.Import,
		initialReduceValue
	);
	const totalIncomes = incomesImports.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialReduceValue
	);

	const currentSavingsForDaniele = currentSavings.filter(
		(saving) => saving.User === "Daniele"
	);
	const currentSavingsForGiulia = currentSavings.filter(
		(saving) => saving.User === "Giulia"
	);
	const danieleSavings = currentSavingsForDaniele.reduce(
		(accumulator, currentValue) => accumulator + currentValue.Import,
		initialReduceValue
	);
	const giuliaSavings = currentSavingsForGiulia.reduce(
		(accumulator, currentValue) => accumulator + currentValue.Import,
		initialReduceValue
	);
	const totalSavings = savingsImports.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		initialReduceValue
	);
	return (
		<div className="flex flex-wrap w-full bg-grey">
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
			<div className="flex flex-col gap-1 justify-center">
				<h2>
					Spese per il mese {budgetForSelectedMonth}, fatte da Daniele :
					{danieleExpenses}€
				</h2>
				<h2>
					Spese per il mese {budgetForSelectedMonth}, fatte da Giulia :
					{giuliaExpenses}€
				</h2>
				<h2>
					Spese totali per il mese {budgetForSelectedMonth}, fatte da Giulia e
					Daniele:
					{totalExpenses}€
				</h2>
			</div>
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
			<div className="flex flex-col gap-1 justify-center">
				<h2>
					Entrate per il mese {budgetForSelectedMonth}, di Daniele :
					{danieleIncomes}€
				</h2>
				<h2>
					Entrate per il mese {budgetForSelectedMonth}, di Giulia :
					{giuliaIncomes}€
				</h2>
				<h2>
					Entrate totali per il mese {budgetForSelectedMonth}, di Daniele e
					Giulia
					{totalIncomes}€
				</h2>
			</div>
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
			<div className="flex flex-col gap-1 justify-center">
				<h2>
					Risparmi per il mese {budgetForSelectedMonth}, fatti da Daniele :
					{danieleSavings}€
				</h2>
				<h2>
					Risparmi per il mese {budgetForSelectedMonth}, fatti da Giulia :
					{giuliaSavings}€
				</h2>
				<h2>
					Risparmi totali per il mese {budgetForSelectedMonth}, di Giulia e
					Daniele:
					{totalSavings}€
				</h2>
			</div>
		</div>
	);
};

export default BudgetGraphsPage;
