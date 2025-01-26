import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { getExpensesData } from "@/helpers/auth";
import { ExpensesData } from "@/types";
import { GetSessionParams, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/react";

import { Fragment, useState } from "react";
import { expensesCategory } from "@/helpers/applicationData";

type PageProps = {
	expenses: {
		expensesData: ExpensesData[];
	};
};

const ExpensesPage = (props: PageProps) => {
	
	const { expensesData } = props.expenses;

	const [visibleExpenses, setVisibleExpenses] = useState(10);
	const expensesPerPage = 10;

	const loadMoreExpenses = () => {
		setVisibleExpenses(
			(prevVisibleExpenses) => prevVisibleExpenses + expensesPerPage
		);
	};
	const hideExpenses = () => {
		setVisibleExpenses((prevVisibleExpenses) =>
			Math.max(0, prevVisibleExpenses - expensesPerPage)
		);
	};
	
	if (!Array.isArray(expensesData) || expensesData.length === 0) {
        return (
            <Fragment>
                <h1>There are no expenses yet, please enter one.</h1>
                <BudgetForm 
                    categoryList={expensesCategory} 
                    category="expenses" 
                    operationType="expense" 
                    importAmount="expensesImport" 
                    formTitle="Expenses form" 
                    dataEntryType="Post" 
                />
            </Fragment>
        );
    }

	return (
		<Fragment>
			<Head>
				<title>All expenses list page</title>
				<meta name="description" content="a list of all expenses" />
			</Head>
			<div>
				<section className="flex flex-col justify-center gap-4">
					<BudgetForm
						categoryList={expensesCategory}
						category="expenses"
						operationType="expense"
						importAmount="expenseImport"
						formTitle="Expenses form"
						dataEntryType="Post"
					/>
					<div className="flex flex-wrap gap-4">
						
					{expensesData.length < 10 ? expensesData.map((expense, index) => (
							<div>
								<Link key={index} href={`/expenses/${expense.id}`}>
									<BudgetDataPanel
										budgetCategory={expense.Category}
										user={expense.User}
										budgetImport={expense.Import}
										budgetOperation={expense.Expense}
									/>
								</Link>
							</div>
						)) : expensesData.slice(0, visibleExpenses).map((expense, index) => (
							<div>
								<Link key={index} href={`/expenses/${expense.id}`}>
									<BudgetDataPanel
										budgetCategory={expense.Category}
										user={expense.User}
										budgetImport={expense.Import}
										budgetOperation={expense.Expense}
									/>
								</Link>
							</div>
						))} 
						<div className="flex flex-col gap-1">
							{expensesData.length > visibleExpenses && (
								<button onClick={loadMoreExpenses}>Mostra altre spese</button>
							)}
							{visibleExpenses > expensesPerPage && (
								<button onClick={hideExpenses}>Nascondi 10 spese</button>
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

    const allExpenses = await getExpensesData(session?.accessToken);
	
    const allExpensesToPass = allExpenses || [];

    return {
        props: { expenses: allExpensesToPass },
    };
}
export default ExpensesPage;
