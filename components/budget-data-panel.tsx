import { BudgetPanelData } from "@/types";

const BudgetDataPanel = ({
	budgetCategory,
	user,
	budgetImport,
}: BudgetPanelData) => {
	return (
		<div className="bg-cyan-600 flex-[20%] rounded-md flex flex-col gap-2 indent-3.5 ">
			<h1 className="font-serif">{budgetCategory}</h1>
			<p className="font-serif">{user}</p>
			<p className="font-serif">
				Import <strong>:{budgetImport}€</strong>
			</p>
		</div>
	);
};

export default BudgetDataPanel;
