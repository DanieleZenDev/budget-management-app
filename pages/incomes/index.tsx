import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";

const IncomesPage = () => {
	const incomesCategory = [
		"Stipendio",
		"Crediti",
		"Lavori occasionali",
		"Prestiti",
	];
	return (
		<div>
			<section className="flex justify-center">
				<BudgetForm
					categoryList={incomesCategory}
					category="incomes"
					operationType="income"
					importAmount="incomeImport"
					formTitle="Incomes form"
				/>
				<BudgetDataPanel
					budgetCategory="Stipendio"
					user="Daniele"
					budgetImport={1450}
				/>
			</section>
		</div>
	);
};

export default IncomesPage;
