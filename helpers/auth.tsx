import {
	ExpensesData,
	HashedPassword,
	IncomesData,
	SavingsData,
	UserData,
} from "@/types";
import { hash, compare } from "bcryptjs";
import { signOut } from "next-auth/react";

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

export async function refreshAccessToken(refreshToken:string) {
    try {
      const res = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
			refreshToken:refreshToken
          //refreshToken: session?.refreshToken, // Passa il refresh token salvato nella sessione
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await res.json();

      refreshToken = data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      signOut();
    }
  };

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

export async function postExpensesData(enteredExpensesData: ExpensesData) {
	try {
		const response = await fetch("/api/budget/expenses", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				// "Authorization": `Bearer ${userToken}`
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

export async function postIncomesData(enteredIncomesData: IncomesData) {
	try {
		const response = await fetch("/api/budget/incomes", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
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

export async function postSavingsData(enteredSavingsData: SavingsData) {
	try {
		const response = await fetch("/api/budget/savings", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(enteredSavingsData),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem while passing the savings data:", error);
	}
}

export async function getExpensesData() {
	console.log("retrieving expenses funciton started");
	try {
		const response = await fetch("http://localhost:3000/api/budget/expenses");
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

export async function getIncomesData() {
	console.log("retrieving incomes funciton started");
	try {
		const response = await fetch("http://localhost:3000/api/budget/incomes");
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
export async function getExpenseById(id: number) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/budget/expenses/${id}`
		);
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

export async function getIncomeById(id: number) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/budget/incomes/${id}`
		);
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

export async function getSavingsData() {
	console.log("retrieving savings funciton started");
	try {
		const response = await fetch("http://localhost:3000/api/budget/savings");
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

export async function getSavingById(id: number) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/budget/savings/${id}`
		);
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

export async function updateExpenseById(
	enteredExpensesData: ExpensesData,
	id: number
) {
	try {
		const response = await fetch(`/api/budget/expenses/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
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
			"There was a problem while updating the expenses data:",
			error
		);
	}
}

export async function updateIncomeById(
	enteredIncomesData: IncomesData,
	id: number
) {
	try {
		const response = await fetch(`/api/budget/incomes/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(enteredIncomesData),
		});
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

export async function updateSavingById(
	enteredSavingsData: SavingsData,
	id: number
) {
	try {
		const response = await fetch(`/api/budget/savings/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(enteredSavingsData),
		});
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

export async function deleteExpenseById(id: number) {
	try {
		const response = await fetch(`/api/budget/expenses/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
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

export async function deleteIncomeById(id: number) {
	try {
		const response = await fetch(`/api/budget/incomes/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem while deleting the income data:", error);
	}
}

export async function deleteSavingById(id: number) {
	try {
		const response = await fetch(`/api/budget/savings/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem while deleting the saving data:", error);
	}
}


