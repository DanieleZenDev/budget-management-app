import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";

const SavingsPage = () => {
	const savingsCategory = [
		"matrimonio",
		"auto",
		"viaggi",
		"emergente",
		"salute",
	];
	return (
		<div>
			<section className="flex justify-center">
				<BudgetForm
					categoryList={savingsCategory}
					category="savings"
					operationType="saving"
					importAmount="savingImport"
					formTitle="Savings form"
				/>
				<BudgetDataPanel
					budgetCategory="Matrimonio"
					user="Giulia"
					budgetImport={150}
				/>
			</section>
		</div>
	);
};

export default SavingsPage;
