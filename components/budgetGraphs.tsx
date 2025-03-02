import { ExpensesData, IncomesData, SavingsData } from "@/types";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";

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
	SelectedMonth: string;
	SelectedYear: number;
};

type BudgetData = ExpensesData | IncomesData | SavingsData;

const filterDataByMonthYear = (
	data: BudgetData[],
	month: string,
	year: number
): BudgetData[] =>
	data.filter((item) => item.Month === month && item.Year === year);

const calculateTotal = (data: { Import: number }[]): number => 
	data.reduce((accumulator, currentValue) => {
    	const currentImportInCents = Math.round(currentValue.Import * 100) / 100;  
    	return accumulator + currentImportInCents;
	}, 0);

const BudgetGraphsPage = ({
	expenses,
	incomes,
	savings,
	SelectedMonth,
	SelectedYear,
}: BudgetAnalysisPageProps) => {
	const currentExpenses = filterDataByMonthYear(
		expenses.expensesData,
		SelectedMonth,
		SelectedYear
	);
	const currentIncomes = filterDataByMonthYear(
		incomes.incomesData,
		SelectedMonth,
		SelectedYear
	);
	const currentSavings = filterDataByMonthYear(
		savings.savingsData,
		SelectedMonth,
		SelectedYear
	);
	
	const expensesCategories = currentExpenses.map((expense) => expense.Category);
	const expensesImports = currentExpenses.map((expense) => expense.Import);
	const incomesCategories = currentIncomes.map((income) => income.Category);
	const incomesImports = currentIncomes.map((income) => income.Import);
	const savingsCategories = currentSavings.map((saving) => saving.Category);
	const savingsImports = currentSavings.map((saving) => saving.Import);

	const giuliaExpenses = calculateTotal(
		currentExpenses.filter((expense) => expense.User === "Giulia")
	);
	const danieleExpenses = calculateTotal(
		currentExpenses.filter((expense) => expense.User === "Daniele")
	);
	const totalExpenses = calculateTotal(currentExpenses);

	const giuliaIncomes = calculateTotal(
		currentIncomes.filter((income) => income.User === "Giulia")
	);
	const danieleIncomes = calculateTotal(
		currentIncomes.filter((income) => income.User === "Daniele")
	);
	const totalIncomes = calculateTotal(currentIncomes);

	const giuliaSavings = calculateTotal(
		currentSavings.filter((saving) => saving.User === "Giulia")
	);
	const danieleSavings = calculateTotal(
		currentSavings.filter((saving) => saving.User === "Daniele")
	);
	const totalSavings = calculateTotal(currentSavings);

	const createBudgetTableForMonth = (
		expensesToPass: BudgetData[],
		tableSheetName: string,
		tableName: string
	) => {
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils?.json_to_sheet(expensesToPass);
		XLSX.utils.book_append_sheet(workbook, worksheet, `${tableSheetName}`);
		XLSX.writeFile(workbook, `${tableName}.xlsx`);
	};

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
					Spese per il mese {SelectedMonth}, fatte da Daniele:
					{danieleExpenses}€
				</h2>
				<h2>
					Spese per il mese {SelectedMonth}, fatte da Giulia:
					{giuliaExpenses}€
				</h2>
				<h2>
					Spese totali per il mese {SelectedMonth}, fatte da Giulia e Daniele:{" "}
					{totalExpenses}€
				</h2>
				<button
					type="button"
					onClick={() =>
						createBudgetTableForMonth(
							currentExpenses,
							"expenses",
							"expensesFor" + "_" + SelectedMonth + "/" + SelectedYear
						)
					}
				>
					<strong>Export expenses for month excel</strong>
				</button>
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
					Entrate per il mese {SelectedMonth}, di Daniele:
					{danieleIncomes}€
				</h2>
				<h2>
					Entrate per il mese {SelectedMonth}, di Giulia:
					{giuliaIncomes}€
				</h2>
				<h2>
					Entrate totali per il mese {SelectedMonth}, di Daniele e Giulia:{" "}
					{totalIncomes}€
				</h2>
				<button
					type="button"
					onClick={() =>
						createBudgetTableForMonth(
							currentIncomes,
							"incomes",
							"incomesFor" + "_" + SelectedMonth + "/" + SelectedYear
						)
					}
				>
					<strong>Export incomes for month excel</strong>
				</button>
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
					Risparmi per il mese {SelectedMonth}, fatti da Daniele:
					{danieleSavings}€
				</h2>
				<h2>
					Risparmi per il mese {SelectedMonth}, fatti da Giulia:
					{giuliaSavings}€
				</h2>
				<h2>
					Risparmi totali per il mese {SelectedMonth}, di Giulia e Daniele:
					{totalSavings}€
				</h2>
				<button
					type="button"
					onClick={() =>
						createBudgetTableForMonth(
							currentSavings,
							"savings",
							"savingsFor" + "_" + SelectedMonth + "/" + SelectedYear
						)
					}
				>
					<strong>Export Savings for month excel</strong>
				</button>
			</div>
		</div>
	);
};

export default BudgetGraphsPage;
