import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { incomesCategory } from "@/helpers/applicationData";
import { getIncomesData } from "@/helpers/auth";
import { IncomesData } from "@/types";
import { GetSessionParams, getSession } from "next-auth/react";
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
	if (!Array.isArray(incomesData) || incomesData.length === 0) {
        return (
            <Fragment>
                <h1>There are no incomes yet, please enter one.</h1>
                <BudgetForm 
                    categoryList={incomesCategory} 
                    category="savings" 
                    operationType="saving" 
                    importAmount="savingImport" 
                    formTitle="Savings form" 
                    dataEntryType="Post" 
                />
            </Fragment>
        );
    }
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
						{incomesData.length < 10 ? incomesData.map((income, index) => (
							<div>
								<Link key={index} href={`/incomes/${income.id}`}>
									<BudgetDataPanel
										budgetCategory={income.Category}
										user={income.User}
										budgetImport={income.Import}
										budgetOperation={income.Income}
									/>
								</Link>
							</div>
						)) : incomesData.slice(0, visibleIncomes).map((income, index) => (
							<div>
								<Link key={index} href={`/incomes/${income.id}`}>
									<BudgetDataPanel
										budgetCategory={income.Category}
										user={income.User}
										budgetImport={income.Import}
										budgetOperation={income.Income}
									/>
								</Link>
							</div>
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

export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context);

    if (!session || !session.accessToken) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    const allIncomes = await getIncomesData(session?.accessToken);

    const allIncomesToPass = allIncomes || [];

    return {
        props: { incomes: allIncomesToPass },
    };
}

export default IncomesPage;
