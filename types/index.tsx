export interface HashedPassword {
	enteredPassword: string;
	hashedPassword: string;
}
export interface UserData {
	Email: string;
	Password: string;
	Name:string | null;
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
	Import: number;
	Month: string;
	Year: number;
	User: string;
	UserId?:number | null;
}

export interface IncomesData {
	id?: number;
	Category: string;
	Income: string;
	Import: number;
	Month: string;
	Year: number;
	User: string;
}

export interface SavingsData {
	id?: number;
	Category: string;
	Saving: string;
	Import: number;
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
	budgetImport: number;
	budgetOperation:string;
}
