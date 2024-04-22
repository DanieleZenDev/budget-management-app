import { BudgetPanelData } from "@/types";

const BudgetDataPanel = ({
	budgetCategory,
	user,
	budgetImport,
}: BudgetPanelData) => {
	return (
		<div className="flex flex-wrap gap-4">
			<div className="bg-cyan-600 h-24 w-[20rem] rounded-md flex flex-col gap-2 indent-3.5 ">
				<h1 className="font-serif">{budgetCategory}</h1>
				<p className="font-serif">{user}</p>
				<p className="font-serif">
					Import <strong>:{budgetImport}€</strong>
				</p>
			</div>
		</div>
	);
};

export default BudgetDataPanel;
