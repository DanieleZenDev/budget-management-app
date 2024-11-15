import BudgetForm from "@/components/budget-form";
import { savingsCategory } from "@/helpers/applicationData";
import {
	deleteSavingById,
	getSavingById
} from "@/helpers/auth";
import { SavingsData } from "@/types";
import { GetServerSidePropsContext} from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

interface SavingsDataForSpecificDynamicId {
	savingData:{ savingsData: SavingsData },
	token:string | undefined
}

const SavingDetailsPage = ({
	savingData,
	token
}: SavingsDataForSpecificDynamicId) => {

	if (!savingData || !savingData.savingsData) {
        return <p>Loading...</p>;  
    }

	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const selectedSaving = savingData.savingsData;

	const router = useRouter();
	const deleteSavingByIdFunction = async () => {
		try {
			await deleteSavingById(parseInt(String(selectedSaving.id)), token);
			router.push("/savings");
		} catch (error) {
			console.error("Error deleting saving:", error);
		}
	};
	return (
		<Fragment>
			<Head>
				<title>Selected saving detail</title>
				<meta name="description" content="a list of all savings"/>
			</Head>
		<div className="bg-cyan-600 rounded-md flex flex-col gap-3 items-center">
			<h1 className="font-serif">
				Saving : <strong>{selectedSaving.Saving}</strong>
			</h1>
			<p className="font-serif">
				This Income is from <strong>{selectedSaving.Month} </strong> in
				<strong>{selectedSaving.Year}</strong>
			</p>
			<button onClick={() => setShowUpdateForm(!showUpdateForm)}>
				Update this Saving
			</button>
			<button onClick={deleteSavingByIdFunction}>Delete this saving</button>
			{showUpdateForm && (
				<BudgetForm
					categoryList={savingsCategory}
					category="savings"
					operationType="saving"
					importAmount="savingImport"
					formTitle="Savings form"
					dataEntryType="Update"
					dynamicId={selectedSaving.id}
					selectedSavingsById={selectedSaving}
				/>
			)}
		</div>
		</Fragment>
		
	);
};
export async function getServerSideProps(context: GetServerSidePropsContext | undefined) {
    const session = await getSession(context);

    if (!session || !session.accessToken) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
	const { savingID } = context?.params || {}; 

    if (!savingID) {
        return {
            notFound: true, 
        };
    }

    const allSavings = await getSavingById(parseInt(String(savingID)), session?.accessToken);
	
    const allSavingsToPass = allSavings || [];

    return {
        props: { savingData:  allSavingsToPass, token:session?.accessToken },
    };
}

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const allSavings = await getSavingsData();

// 	const paths = allSavings.savingsData.map((saving: SavingsData) => ({
// 		params: { savingID: saving.id?.toString() },
// 	}));

// 	return {
// 		paths,
// 		//fallback: false,
// 		fallback:'blocking'
// 	};
// };

// export const getStaticProps: GetStaticProps = async ({ params }: any) => {
// 	const savingID = params.savingID;
// 	const savingData = await getSavingById(parseInt(String(savingID)));

// 	return {
// 		props: {
// 			savingData,
// 		},
// 	};
// };

export default SavingDetailsPage;
