import BudgetDataPanel from "@/components/budget-data-panel";
import BudgetForm from "@/components/budget-form";
import { savingsCategory } from "@/helpers/applicationData";
import { getSavingsData } from "@/helpers/auth";
import { SavingsData } from "@/types";
import { GetSessionParams, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";

type PageProps = {
	savings: { savingsData: SavingsData[] };
};

const SavingsPage = (props: PageProps) => {
	const { savingsData } = props.savings;
	
	const [visibleSavings, setVisibleSavings] = useState(10);
	const savingsPerPage = 10;

	const loadMoreSavings = () => {
		setVisibleSavings(
			(prevVisibleSavings) => prevVisibleSavings + savingsPerPage
		);
	};
	const hideSavings = () => {
		setVisibleSavings((prevVisibleSavings) =>
			Math.max(0, prevVisibleSavings - savingsPerPage)
		);
	};
	
	if (!Array.isArray(savingsData) || savingsData.length === 0) {
        return (
            <Fragment>
                <h1>There are no savings yet, please enter one.</h1>
                <BudgetForm 
                    categoryList={savingsCategory} 
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
				<title>All savings list page</title>
				<meta name="description" content="further details about my saving"/>
			</Head>
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
					
					{savingsData.length !== 0 && savingsData.length < 10 ? savingsData.map(saving => (
							<div>
								<Link key={saving.id} href={`/savings/${saving.id}`}>
									<BudgetDataPanel
										budgetCategory={saving.Category}
										user={saving.User}
										budgetImport={saving.Import}
										budgetOperation={saving.Saving}
									/>
								</Link>
							</div>
						)) : savingsData.slice(0, visibleSavings).map(saving => (
							<div>
								<Link key={saving.id} href={`/savings/${saving.id}`}>
									<BudgetDataPanel
										budgetCategory={saving.Category}
										user={saving.User}
										budgetImport={saving.Import}
										budgetOperation={saving.Saving}
									/>
								</Link>
							</div>
						))
					} 

					<div className="flex flex-col gap-1">
						{savingsData.length > visibleSavings && (
							<button onClick={loadMoreSavings}>Mostra altri risparmi</button>
						)}
						{visibleSavings > savingsPerPage && (
							<button onClick={hideSavings}>Nascondi 10 entrate</button>
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

    const allSavings = await getSavingsData(session?.accessToken);

    const allSavingsToPass = allSavings || [];

    return {
        props: { savings: allSavingsToPass },
    };
}

export default SavingsPage;
