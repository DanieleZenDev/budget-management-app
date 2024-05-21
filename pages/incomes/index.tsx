import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { getIncomesData } from "@/helpers/auth";
import { IncomesData } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";
type PageProps = {
	incomes: {
		incomesData: IncomesData[];
	};
};

const IncomesPage = (props: PageProps) => {
	const { incomesData } = props.incomes;
	console.log("inco", incomesData);

	const [visibleIncomes, setVisibleIncomes] = useState(10);
	const incomesPerPage = 10;

	const loadMoreIncomes = () => {
		setVisibleIncomes(
			(prevVisibleIncomes) => prevVisibleIncomes + incomesPerPage
		);
	};
	const hideIncomes = () => {
		setVisibleIncomes((prevVisibleIncomes) =>
			Math.max(0, prevVisibleIncomes - incomesPerPage)
		);
	};
	const incomesCategory = [
		"Stipendio",
		"Crediti",
		"Lavori occasionali",
		"Prestiti",
		"Rimborsi",
		"Regali",
	];
	return (
		<Fragment>
			<Head>
				<title>All incomes list page</title>
				<meta name="description" content="a list of all incomes"/>
			</Head>
		<div>
			<section className="flex flex-col justify-center gap-4">
				<BudgetForm
					categoryList={incomesCategory}
					category="incomes"
					operationType="income"
					importAmount="incomeImport"
					formTitle="Incomes form"
					dataEntryType="Post"
				/>
				<div className="flex flex-wrap gap-4">
					{incomesData.slice(0, visibleIncomes).map((income, index) => (
						<Link key={index} href={`/incomes/${income.id}`}>
							<BudgetDataPanel
								budgetCategory={income.Category}
								user={income.User}
								budgetImport={income.Import}
							/>
						</Link>
					))}
					<div className="flex flex-col gap-1">
						{incomesData.length > visibleIncomes && (
							<button onClick={loadMoreIncomes}>Mostra altre entrate</button>
						)}
						{visibleIncomes > incomesPerPage && (
							<button onClick={hideIncomes}>Nascondi 10 entrate</button>
						)}
					</div>
				</div>
			</section>
		</div>
		</Fragment>
		
	);
};

export async function getStaticProps() {
	const allIncomes = await getIncomesData();
	const allIncomesToPass = allIncomes || [];

	return {
		props: { incomes: allIncomesToPass },
	};
}

export default IncomesPage;
