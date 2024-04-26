import {
	postExpensesData,
	postIncomesData,
	postSavingsData,
	updateExpenseById,
	updateIncomeById,
	updateSavingById,
} from "@/helpers/auth";
import { BudgetFormData } from "@/types";
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

	let fullUrl = router.asPath;
	console.log("furl", fullUrl);
	let categoryValue = null;
	let budgetValue = null;
	let importValue = null;
	let userValue = null;

	if (selectedExpenseById) {
		console.log("sebi", selectedExpenseById);
		categoryValue = selectedExpenseById.Category;
		budgetValue = selectedExpenseById.Expense;
		importValue = selectedExpenseById.Import;
		userValue = selectedExpenseById.User;
	}
	if (selectedincomesById) {
		console.log("seibi", selectedincomesById);
		categoryValue = selectedincomesById.Category;
		budgetValue = selectedincomesById.Income;
		importValue = selectedincomesById.Import;
		userValue = selectedincomesById.User;
	}
	if (selectedSavingsById) {
		console.log("seibi", selectedSavingsById);
		categoryValue = selectedSavingsById.Category;
		budgetValue = selectedSavingsById.Saving;
		importValue = selectedSavingsById.Import;
		userValue = selectedSavingsById.User;
	}
	console.log(
		"obj INP val",
		"cv",
		categoryValue,
		"bv",
		budgetValue,
		"iv",
		importValue,
		"usv",
		userValue
	);
	const formRef = useRef<HTMLFormElement>(null);
	const budgetCategoryRef = useRef<HTMLSelectElement>(null);
	const budgetOperationTypeRef = useRef<HTMLInputElement>(null);
	const budgetImportRef = useRef<HTMLInputElement>(null);
	const userInputRef = useRef<HTMLSelectElement>(null);

	const actualYear = new Date().getFullYear();
	console.log("actual year", actualYear);
	const date = new Date();
	const actualMonth = date.toLocaleString("default", { month: "long" });
	console.log("month", actualMonth);

	const submitBudgetData = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const budgetCategoryEnteredValue = budgetCategoryRef.current?.value || "";
		let budgetOperationTypeEnteredValue =
			budgetOperationTypeRef.current?.value || "";
		const budgetImportRefEnteredValue = budgetImportRef.current?.value || "";
		const userEnteredValue = userInputRef.current?.value || "";

		const importValue = budgetImportRefEnteredValue
			? parseInt(budgetImportRefEnteredValue)
			: 0;

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

			console.log("budget data to pass", budgetDataToPass);
			postExpensesData(budgetDataToPass);
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
		} else if (fullUrl === `/expenses/${dynamicId}`) {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Expense: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			console.log("budget data to pass", budgetDataToPass);
			updateExpenseById(budgetDataToPass, parseInt(String(dynamicId)));
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
		} else if (fullUrl === "/incomes") {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Income: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			console.log("budget data to pass", budgetDataToPass);
			postIncomesData(budgetDataToPass);
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
		} else if (fullUrl === `/incomes/${dynamicId}`) {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Income: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			console.log("budget data to pass", budgetDataToPass);
			updateIncomeById(budgetDataToPass, parseInt(String(dynamicId)));
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
		} else if (fullUrl === "/savings") {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Saving: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			console.log("budget data to pass", budgetDataToPass);
			postSavingsData(budgetDataToPass);
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
		} else if (fullUrl === `/savings/${dynamicId}`) {
			budgetDataToPass = {
				Category: budgetCategoryEnteredValue,
				Saving: budgetOperationTypeEnteredValue,
				Import: importValue,
				Month: actualMonth,
				Year: actualYear,
				User: userEnteredValue,
			};
			console.log("budget data to pass", budgetDataToPass);
			updateSavingById(budgetDataToPass, parseInt(String(dynamicId)));
			if (formRef.current) {
				formRef.current.querySelectorAll("input").forEach((input) => {
					input.value = "";
				});
			}
		}
	};

	return (
		<div className="m-12 h-100 max-w-25rem rounded-lg bg-purple-900 shadow-md p-4 text-center w-96">
			<h1 className="text-center text-white">{formTitle}</h1>
			<form onSubmit={submitBudgetData} ref={formRef}>
				<div className="mb-[0.5rem]">
					<h1 className="inline-block text-white font-bold mb-[0.5rem]">
						Category
					</h1>
					<select
						className="bg-purple-100 text-purple-900 border border-white rounded-md w-full text-left px-1"
						name={category}
						defaultValue={categoryValue ?? ""}
						ref={budgetCategoryRef}
					>
						{categoryList.map((scategory, idx) => (
							<option key={idx}>{scategory}</option>
						))}
					</select>
				</div>
				<div className="mb-[0.5rem]">
					<label
						htmlFor={operationType}
						className="inline-block text-white font-bold mb-[0.5rem]"
					>
						{operationType}
					</label>
					<input
						type="text"
						id={operationType}
						ref={budgetOperationTypeRef}
						defaultValue={budgetValue ?? ""}
						required
						className="bg-purple-100 text-purple-900 border border-white rounded-md w-full text-left px-1"
					/>
				</div>
				<div className="mb-[0.5rem]">
					<label
						htmlFor={importAmount}
						className="inline-block text-white font-bold mb-[0.5rem]"
					>
						Import
					</label>
					<input
						type="number"
						id={importAmount}
						required
						defaultValue={importValue ?? ""}
						ref={budgetImportRef}
						className="bg-purple-100 text-purple-900 border border-white rounded-md w-full text-left px-1"
					/>
				</div>
				<div className="mb-[0.5rem]">
					<h1 className="inline-block text-white font-bold mb-[0.5rem]">
						Users
					</h1>
					<select
						className="bg-purple-100 text-purple-900 border border-white rounded-md w-full text-left px-1"
						name="user"
						ref={userInputRef}
						defaultValue={userValue ?? ""}
					>
						{users.map((user, idx) => (
							<option key={idx}>{user}</option>
						))}
					</select>
				</div>

				<div className="mt-[1.5rem] flex flex-col items-center">
					<button className="cursor-pointer font-inherit text-white bg-purple-600 border border-purple-600 rounded-md px-10 py-2 hover:bg-purple-700 hover:border-purple-600 mt-[1.2rem] bg-transparent border-none p-[0.15rem 1.5rem]">
						{dataEntryType} {operationType}
					</button>
				</div>
			</form>
		</div>
	);
};

export default BudgetForm;
