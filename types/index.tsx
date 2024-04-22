export interface HashedPassword {
	enteredPassword: string;
	hashedPassword: string;
}
export interface UserData {
	Email: string;
	Password: string;
}

export interface CustomUser {
	id: number;
	Email: string;
	Password: string;
}

export interface ExpensesData {
	Category: string;
	Expense: string;
	Import: number;
	Month: string;
	Year: number;
	User: string;
}

export interface IncomesData {
	Category: string;
	Income: string;
	Import: number;
	Month: string;
	Year: number;
	User: string;
}

export interface SavingsData {
	Category: string;
	Saving: string;
	Import: number;
	Month: string;
	Year: number;
	User: string;
}

export interface BudgetFormData {
	categoryList: string[];
	category: string;
	operationType: string;
	importAmount: string;
	formTitle: string;
}

export interface BudgetPanelData {
	budgetCategory: string;
	user: string;
	budgetImport: number;
}
