import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { getSavingsData } from "@/helpers/auth";
import { SavingsData } from "@/types";
import Link from "next/link";
type PageProps = {
	savings: {
		savingsData: SavingsData[];
	};
};

const SavingsPage = (props: PageProps) => {
	const { savingsData } = props.savings;
	console.log("SAV", savingsData);
	const savingsCategory = [
		"matrimonio",
		"auto",
		"viaggi",
		"emergente",
		"salute",
	];
	return (
		<div>
			<section className="flex flex-col justify-center gap-4">
				<BudgetForm
					categoryList={savingsCategory}
					category="savings"
					operationType="saving"
					importAmount="savingImport"
					formTitle="Savings form"
					dataEntryType="Post"
				/>
				<div className="flex flex-wrap gap-4">
					{savingsData.map((saving, index) => (
						<Link key={index} href={`/savings/${saving.id}`}>
							<BudgetDataPanel
								budgetCategory={saving.Category}
								user={saving.User}
								budgetImport={saving.Import}
							/>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
};

export async function getStaticProps() {
	const allSavings = await getSavingsData();
	const allSavingsToPass = allSavings || [];

	return {
		props: { savings: allSavingsToPass },
	};
}

export default SavingsPage;
