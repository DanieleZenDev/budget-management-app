import BudgetForm from "@/components/budget-form";
import {
	deleteSavingById,
	getSavingById,
	getSavingsData,
} from "@/helpers/auth";
import { SavingsData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const SavingDetailsPage = ({
	savingData,
}: {
	savingData: { savingsData: SavingsData };
}) => {
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const selectedSaving = savingData.savingsData;
	console.log("INC", selectedSaving);
	const savingsCategory = [
		"matrimonio",
		"auto",
		"viaggi",
		"emergente",
		"salute",
	];
	const router = useRouter();
	const deleteSavingByIdFunction = async () => {
		try {
			await deleteSavingById(parseInt(String(selectedSaving.id)));
			router.push("/savings");
		} catch (error) {
			console.error("Error deleting saving:", error);
		}
	};
	return (
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
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const allSavings = await getSavingsData();

	const paths = allSavings.savingsData.map((saving: SavingsData) => ({
		params: { savingID: saving.id?.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const savingID = params.savingID;
	const savingData = await getSavingById(parseInt(String(savingID)));

	return {
		props: {
			savingData,
		},
	};
};

export default SavingDetailsPage;
