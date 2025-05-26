import {
	ExpensesData,
	HashedPassword,
	IncomesData,
	SavingsData,
	UserData,
} from "@/types";
import { hash, compare } from "bcryptjs";

import { createHash } from 'crypto';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function generateUniqueId (userId:number, email:string) {
    const hash = createHash('sha256');
    hash.update(`${userId}-${email}`); 
    return hash.digest('hex'); 
};

export async function hashPassword(enteredPassword: string) {
	const hashedPassword = await hash(enteredPassword, 12);
	return hashedPassword;
}

export async function verifyPassword({
	enteredPassword,
	hashedPassword,
}: HashedPassword) {
	const isValidPsw = await compare(enteredPassword, hashedPassword);
	return isValidPsw;
}


export async function postUserData(enteredSignupData: UserData) {
	try {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify(enteredSignupData),
			headers: {
				"Content-type": "application/json",
			},
		});
		console.log("res", response);
		if (!response.ok) {
			const errorData = await response.json(); 
			if (Array.isArray(errorData.message)) {
				return { error: errorData.message }; 
			}

			return { error: [errorData.message] };
		}
		const data = await response.json();
		return { data };
	} catch (error) {
		//return { error }
		return { error: [error] }; 
	}
}

export async function postExpensesData(enteredExpensesData: ExpensesData, userToken:string | undefined) {
	
	if (!userToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }
	
	try {
		const response = await fetch("/api/budget/expenses", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": `Bearer ${userToken}`
			},
			body: JSON.stringify(enteredExpensesData),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem while passing the expenses data:",
			error
		);
	}
}

export async function postIncomesData(enteredIncomesData: IncomesData, userToken:string | undefined) {
	
	if (!userToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	try {
		const response = await fetch("/api/budget/incomes", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": `Bearer ${userToken}`
			},
			body: JSON.stringify(enteredIncomesData),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = response.json();
		return data;
	} catch (error) {
		console.error("There was a problem while passing the incomes data:", error);
	}
}

export async function postSavingsData(enteredSavingsData: SavingsData, userToken:string | undefined) {

	if (!userToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }
	const headersToPass = {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${userToken}`
		},
		body: JSON.stringify(enteredSavingsData)
	}

	try {
		const response = await fetch("/api/budget/savings", headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem while passing the savings data:", error);
	}
}

export async function getExpensesData(accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}

	try {
		//const response = await fetch("http://localhost:3000/api/budget/expenses", headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/expenses`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem in retrieving the expenses data:",
			error
		);
		//throw error;
	}
}

export async function getAllExpensesData(accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}

	try {
		//const response = await fetch("http://localhost:3000/api/budget/allexpenses", headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/allexpenses`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem in retrieving the expenses data:",
			error
		);
		//throw error;
	}
}

export async function getIncomesData(accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }
	
	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}

	try {
		//const response = await fetch("http://localhost:3000/api/budget/incomes", headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/incomes`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem in retrieving the incomes data:", error);
		//throw error;
	}
}

export async function getAllIncomesData(accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }
	
	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}

	try {
		//const response = await fetch("http://localhost:3000/api/budget/allincomes", headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/allincomes`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem in retrieving the incomes data:", error);
		//throw error;
	}
}

export async function getSavingsData(accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}

	try {
		//const response = await fetch("http://localhost:3000/api/budget/savings", headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/savings`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem in retrieving the savings data:", error);
		//throw error;
	}
}

export async function getAllSavingsData(accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}

	try {
		//const response = await fetch("http://localhost:3000/api/budget/allsavings", headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/allsavings`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem in retrieving the savings data:", error);
		//throw error;
	}
}

export async function getExpenseById(id: number, accessToken:string | undefined) {
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}
	try {
		//const response = await fetch(`http://localhost:3000/api/budget/expenses/${id}`, headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/expenses/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem in retrieving the expenses data by its id:",
			error
		);
	}
}

export async function getIncomeById(id: number, accessToken:string | undefined) {
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }
	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}
	try {
		//const response = await fetch(`http://localhost:3000/api/budget/incomes/${id}`, headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/incomes/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem in retrieving the expenses data by its id:",
			error
		);
	}
}

export async function getSavingById(id: number, accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }
	const headersToPass = {
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
	}

	try {
		//const response = await fetch(`http://localhost:3000/api/budget/savings/${id}`, headersToPass);
		const response = await fetch(`${baseUrl}/api/budget/savings/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem in retrieving the savings data by its id:",
			error
		);
	}
}

export async function updateExpenseById(enteredExpensesData: ExpensesData,id: number, accessToken:string | undefined) {
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		method:"PUT",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify(enteredExpensesData),
	}

	try {
		const response = await fetch(`/api/budget/expenses/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem while updating the expenses data:",
			error
		);
	}
}

export async function updateIncomeById(enteredIncomesData: IncomesData,id: number, accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		method:"PUT",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify(enteredIncomesData),
	}

	try {
		const response = await fetch(`/api/budget/incomes/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem while updating the incomes data:",
			error
		);
	}
}

export async function updateSavingById(enteredSavingsData: SavingsData,id: number, accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		method:"PUT",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		},
		body: JSON.stringify(enteredSavingsData),
	}
	
	try {
		const response = await fetch(`/api/budget/savings/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem while updating the savings data:",
			error
		);
	}
}

export async function deleteExpenseById(id: number, accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		method:"DELETE",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		}
	}

	try {
		const response = await fetch(`/api/budget/expenses/${id}`, headersToPass);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(
			"There was a problem while deleting the expense data:",
			error
		);
	}
}

export async function deleteIncomeById(id: number, accessToken:string | undefined) {
	
	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		method:"DELETE",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		}
	}

	try {
		const response = await fetch(`/api/budget/incomes/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem while deleting the income data:", error);
	}
}

export async function deleteSavingById(id: number, accessToken:string | undefined) {

	if (!accessToken) {
        console.error("Access token is missing or invalid.");
        //throw new Error("Access token is required");
    }

	const headersToPass = {
		method:"DELETE",
		headers: {
			"Content-type": "application/json",
			"Authorization": `Bearer ${accessToken}`
		}
	}

	try {
		const response = await fetch(`/api/budget/savings/${id}`, headersToPass);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem while deleting the saving data:", error);
	}
}


