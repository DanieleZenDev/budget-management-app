import { useRef } from "react";
type FilterSearchProps = {
	onFilterChange: (month: string, year: number) => void;
};
const FilterSearch = ({ onFilterChange }: FilterSearchProps) => {
	const monthRef = useRef<HTMLSelectElement>(null);
	const yearRef = useRef<HTMLSelectElement>(null);

	const years = [];
	for (let year = 2024; year <= 2030; year++) {
		years.push(year);
	}

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const retrieveAndPassFilterFormData = (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		const chosenMonth = monthRef.current?.value;
		const chosenYear = yearRef.current?.value;
		//console.log("chosen month", chosenMonth, "chosen year", chosenYear);
		if (chosenMonth && chosenYear) {
			onFilterChange(chosenMonth, parseInt(String(chosenYear)));
		}
	};
	return (
		<div className="flex justify-center bg-gradient-to-b from-gray-200 to-gray-300 py-8">
			<div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
				<form className="px-6 py-4" onSubmit={retrieveAndPassFilterFormData}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="year"
						>
							Year
						</label>
						<select
							id="year"
							name="year"
							ref={yearRef}
							className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							{years.map((year, idx) => (
								<option key={idx}>{year}</option>
							))}
						</select>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="month"
						>
							Month
						</label>
						<select
							id="month"
							name="month"
							ref={monthRef}
							className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							{months.map((month, idx) => (
								<option key={idx}>{month}</option>
							))}
						</select>
					</div>
					<div className="flex justify-center">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Filter
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FilterSearch;
