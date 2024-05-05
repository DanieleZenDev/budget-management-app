import Plot from "react-plotly.js";
const BudgetGraphsPage = () => {
	return (
		<div>
			<Plot
				data={[
					{
						values: [19, 26, 55],
						labels: ["Residential", "Non-Residential", "Utility"],
						type: "pie",
					},
				]}
				layout={{ width: 620, height: 440, title: "A Fancy Plot" }}
			/>
			<Plot
				data={[
					{
						values: [19, 26, 55],
						labels: ["Residential", "Non-Residential", "Utility"],
						type: "pie",
					},
				]}
				layout={{ width: 620, height: 440, title: "A Fancy Plot" }}
			/>
		</div>
	);
};

export default BudgetGraphsPage;
