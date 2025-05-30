
import { Prisma } from "@prisma/client";
import {
	postExpensesData,
	postIncomesData,
	postSavingsData,
	updateExpenseById,
	updateIncomeById,
	updateSavingById,
} from "@/helpers/auth";
import { BudgetFormData } from "@/types";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { useRef } from "react";

const BudgetForm = ({
	categoryList,
	category,
	operationType,
	importAmount,
	formTitle,
	dataEntryType,
	dynamicId,
	selectedExpenseById,
	selectedincomesById,
	selectedSavingsById,
}: BudgetFormData) => {
	
	const users = ["Daniele", "Giulia"];
	const router = useRouter();

	const { data:session } = useSession();
	const accessToken = session?.accessToken;

	let fullUrl = router.asPath;
	console.log("furl", fullUrl);
	let categoryValue = null;
	let budgetValue = null;
	let importValue = null;
	let userValue = null;

	if (selectedExpenseById) {
		
		categoryValue = selectedExpenseById.Category;
		budgetValue = selectedExpenseById.Expense;
		importValue = selectedExpenseById.Import;
		userValue = selectedExpenseById.User;
	}
	if (selectedincomesById) {
		
		categoryValue = selectedincomesById.Category;
		budgetValue = selectedincomesById.Income;
		importValue = selectedincomesById.Import;
		userValue = selectedincomesById.User;
	}
	if (selectedSavingsById) {
		
		categoryValue = selectedSavingsById.Category;
		budgetValue = selectedSavingsById.Saving;
		importValue = selectedSavingsById.Import;
		userValue = selectedSavingsById.User;
	}

	function getNumberFromDecimal(value: Prisma.Decimal | number): number {
		if (typeof value === 'object' && 'toNumber' in value) {
			return value.toNumber();  
		}
		return typeof value === 'number' ? value : Number(value);
	}

	const formRef = useRef<HTMLFormElement>(null);
	//const budgetCategoryRef = useRef<HTMLSelectElement>(null);
	const budgetCategoryRef = useRef<HTMLInputElement>(null);
	const budgetOperationTypeRef = useRef<HTMLInputElement>(null);
	const budgetImportRef = useRef<HTMLInputElement>(null);
	//const userInputRef = useRef<HTMLSelectElement>(null);
	const userInputRef = useRef<HTMLInputElement>(null);

	const actualYear = new Date().getFullYear();

	const date = new Date();
	const actualMonth = date.toLocaleString("default", { month: "long" });
	

	const submitBudgetData = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const budgetCategoryEnteredValue = budgetCategoryRef.current?.value || "";
		let budgetOperationTypeEnteredValue = budgetOperationTypeRef.current?.value || "";
		const budgetImportRefEnteredValue = budgetImportRef.current?.value || "";
		const userEnteredValue = userInputRef.current?.value || "";

		const importValue = budgetImportRefEnteredValue ? Number(budgetImportRefEnteredValue) : 0;
		
		let budgetDataToPass = null;

		if (fullUrl === "/expenses") {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Expense: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			
			postExpensesData(budgetDataToPass, accessToken);
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}

			router.push("/expenses");
		} else if (fullUrl === `/expenses/${dynamicId}`) {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Expense: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			
			updateExpenseById(budgetDataToPass, parseInt(String(dynamicId)), accessToken);
			router.push("/expenses");
		} else if (fullUrl === "/incomes") {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Income: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			
			postIncomesData(budgetDataToPass, accessToken);
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
			router.push("/incomes");
		} else if (fullUrl === `/incomes/${dynamicId}`) {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Income: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};

			updateIncomeById(budgetDataToPass, parseInt(String(dynamicId)), accessToken);
			router.push("/incomes");
		} else if (fullUrl === "/savings") {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Saving: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			
			postSavingsData(budgetDataToPass, accessToken);
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
			router.push("/savings");
		} else if (fullUrl === `/savings/${dynamicId}`) {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Saving: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
		
			updateSavingById(budgetDataToPass, parseInt(String(dynamicId)), accessToken);
			router.push("/savings");
		}
		
	};

	return (
		<div className="flex justify-center ">
			<div className="max-w-md w-[500px] bg-white shadow-md rounded-lg overflow-hidden">
				<h1 className="text-center text-xl font-bold bg-blue-500 text-white py-4">
					{formTitle}
				</h1>
				<form className="px-6 py-4" onSubmit={submitBudgetData} ref={formRef}>
					<div className="mb-[0.5rem]">
						
						{/* <h1 className="block text-gray-700 text-sm font-bold mb-2">
							Category
						</h1>
						<select
							className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
							name={category}
							defaultValue={categoryValue ?? ""}
							ref={budgetCategoryRef}
						>
							{categoryList.map((scategory, idx) => (
								<option key={idx}>{scategory}</option>
							))}
						</select>
							 */}
						<label
							htmlFor={category}
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Category
						</label>
						<input
							type="text"
							id={category}
							ref={budgetCategoryRef}
							defaultValue={categoryValue ?? ""}
							required
							className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
						/>
					</div>
					<div className="mb-[0.5rem]">
						<label
							htmlFor={operationType}
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							{operationType}
						</label>
						<input
							type="text"
							id={operationType}
							ref={budgetOperationTypeRef}
							defaultValue={budgetValue ?? ""}
							required
							className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
						/>
					</div>
					<div className="mb-[0.5rem]">
						<label
							htmlFor={importAmount}
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Import
						</label>
						<input
							type="number"
							id={importAmount}
							required
							defaultValue={importValue !== null && importValue !== undefined ? getNumberFromDecimal(importValue) : ""}
							ref={budgetImportRef}
							step="0.01"  
							className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
						/>
					</div>
					<div className="mb-[0.5rem]">
						{/* <h1 className="block text-gray-700 text-sm font-bold mb-2">
							Users
						</h1>
						<select
							className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
							name="user"
							ref={userInputRef}
							defaultValue={userValue ?? ""}
						>
							{users.map((user, idx) => (
								<option key={idx}>{user}</option>
							))}
						</select> */}
						<label
							htmlFor="user"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Users
						</label>
						<input
							type="text"
							id="user"
							ref={userInputRef}
							defaultValue={userValue ?? ""}
							required
							className="bg-gray-100 border border-gray-300 rounded-md w-full text-left px-1"
						/>
					</div>

					<div className="mt-[1.5rem] flex flex-col items-center">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							{dataEntryType} {operationType}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BudgetForm;
