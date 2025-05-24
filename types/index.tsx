
import { Prisma } from "@prisma/client";

export interface HashedPassword {
	enteredPassword: string;
	hashedPassword: string;
}
export interface UserData {
	Email: string;
	Password: string;
	Name:string | null;
	UserId?:number | null;
}

export interface CustomUser {
	id: number;
	Email: string;
	Password: string;
}

export interface ExpensesData {
	id?: number;
	Category: string;
	Expense: string;
	Import:Prisma.Decimal | number;
	Month: string;
	Year: number;
	User: string;
	UserId?:string| null;
}

export interface IncomesData {
	id?: number;
	Category: string;
	Income: string;
	Import:Prisma.Decimal | number;
	Month: string;
	Year: number;
	User: string;
}

export interface SavingsData {
	id?: number;
	Category: string;
	Saving: string;
	Import:Prisma.Decimal | number;
	Month: string;
	Year: number;
	User: string;
}

export interface BudgetFormData {
	dataEntryType: string;
	categoryList: string[];
	category: string;
	operationType: string;
	importAmount: string;
	formTitle: string;
	dynamicId?: number;
	selectedExpenseById?: ExpensesData;
	selectedincomesById?: IncomesData;
	selectedSavingsById?: SavingsData;
}

export interface BudgetPanelData {
	budgetCategory: string;
	user: string;
	budgetImport: Prisma.Decimal | number;
	budgetOperation:string;
}
