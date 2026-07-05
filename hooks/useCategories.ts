import { useEffect, useState } from "react";

type CategoryType = "Expenses" | "Incomes" | "Savings";

export function useCategories(type: CategoryType, accessToken: string) {
	const [categories, setCategories] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCategories() {
			try {
				if (!accessToken) return;
				setLoading(true);
				setError(null);

				const res = await fetch(`/api/budget/expensescategories?type=${type}`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (!res.ok) {
					throw new Error("Failed to fetch categories");
				}

				const data = await res.json();

				setCategories(data.categories);
			} catch (err: any) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		}

		fetchCategories();
	}, [type]);

	return { categories, loading, error };
}
