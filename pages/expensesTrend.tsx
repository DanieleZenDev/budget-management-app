import { useEffect, useState } from "react";
import { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";
import {
	getExpensesTrendPerYearAndCategory,
	getExpensesTrendPerYearAndMonthGroupByCategory,
	getExpensesIncidence,
} from "@/helpers/auth";
import { expensesCategory, months } from "@/helpers/applicationData";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	PieChart,
	Pie,
	Cell,
	Legend,
	BarChart,
	Bar,
} from "recharts";

type Expense = {
	Category: string;
	Import: number;
	Month: string;
	Year: number;
};

type accessToken = {
	accessToken: string;
};
type PieChartData = {
	name: string;
	value: number;
};

type IncidenceData = {
	totalMonth: number;
	categoryTotal: number;
	incidencePercentage: number;
};
const ExpensesTrend = (props: accessToken) => {
	const accessToken = props.accessToken;

	const [year, setYear] = useState<number | null>(null);
	const [category, setCategory] = useState<string | null>(null);
	const [data, setData] = useState<Expense[]>([]);
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
	const [pieData, setPieData] = useState<PieChartData[]>([]);
	const [loading, setLoading] = useState(false);

	// 🔥 INCIDENCE DATA STATES
	const [incidenceMonth, setIncidenceMonth] = useState<string | null>(null);
	const [incidenceCategory, setIncidenceCategory] = useState<string | null>(
		null,
	);
	const [incidenceData, setIncidenceData] = useState<IncidenceData | null>(
		null,
	);
	const [incidenceLoading, setIncidenceLoading] = useState(false);

	const years = Array.from({ length: 7 }, (_, i) => 2024 + i);

	// 🔥 TREND BY YEAR AND CATEGORY DATA FETCH
	useEffect(() => {
		// ❌ do not call API if filteres aren't ready yet
		if (!year || !category) return;

		const fetchFilteredData = async () => {
			setLoading(true);
			const trendDataPerYearAndCategory =
				await getExpensesTrendPerYearAndCategory(accessToken, year, category);

			setData(trendDataPerYearAndCategory.expensesData);
			setLoading(false);
		};

		fetchFilteredData();
	}, [year, category]); // 🔥 dependencies

	// 🔥 TREND BY YEAR AND MONTH DATA FETCH
	useEffect(() => {
		// ❌ do not call API if filteres aren't ready yet
		if (!year || !selectedMonth) return;
		setLoading(true);

		const fetchPieData = async () => {
			const trendDataPerYearAndMonth =
				await getExpensesTrendPerYearAndMonthGroupByCategory(
					accessToken,
					year,
					selectedMonth,
				);

			// 🔥 Adapting format of response data for recharts
			const trendDataPerYearAndMonthFormatted =
				trendDataPerYearAndMonth.expensesData.map((e: any) => ({
					name: e.Category,
					value: e.total,
				}));

			setPieData(trendDataPerYearAndMonthFormatted);
			setLoading(false);
		};

		fetchPieData();
	}, [year, selectedMonth]); // 🔥 dependencies

	// 🔥 INCIDENCE DATA FETCH
	useEffect(() => {
		// ❌ do not call API if filters aren't ready yet
		if (!year || !incidenceMonth || !incidenceCategory) return;

		const fetchIncidenceData = async () => {
			setIncidenceLoading(true);
			const incidenceDataResponse = await getExpensesIncidence(
				accessToken,
				year,
				incidenceMonth,
				incidenceCategory,
			);

			if (incidenceDataResponse?.incidenceData) {
				setIncidenceData(incidenceDataResponse.incidenceData);
			}
			setIncidenceLoading(false);
		};

		fetchIncidenceData();
	}, [year, incidenceMonth, incidenceCategory]); // 🔥 dependencies

	// 🔥 AGGREGATION (equivalent to groupby + sum)
	const trendData = months.map((month) => {
		const total = data
			.filter((e) => e.Month === month)
			.reduce((sum, e) => sum + e.Import, 0);

		return {
			month,
			total,
		};
	});

	// 🎨 COLOR PALETTE FOR PIE CHART
	const COLORS = [
		"#FF6B6B",
		"#4ECDC4",
		"#45B7D1",
		"#FFA07A",
		"#98D8C8",
		"#F7DC6F",
		"#BB8FCE",
		"#85C1E2",
		"#F8B88B",
		"#A8E6CF",
	];

	return (
		<div className="p-6 space-y-6">
			{/* TREND BY YEAR AND CATEGORY SECTION */}
			<h1 className="text-xl font-bold">📈 Trend data per year and category</h1>

			{/* FILTERS FOR TREND BY YEAR AND CATEGORY SECTION*/}
			<div className="flex gap-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="years"
				>
					Years
				</label>
				<select
					onChange={(e) => setYear(Number(e.target.value))}
					className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					{years.map((y) => (
						<option key={y}>{y}</option>
					))}
				</select>
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="category"
				>
					Categories
				</label>
				<select
					onChange={(e) => setCategory(e.target.value)}
					className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					{expensesCategory.map((c) => (
						<option key={c}>{c}</option>
					))}
				</select>
			</div>

			{loading && <p>Loading...</p>}

			{/* 📊 LINE PLOT DISPLAY FOR TREND BY YEAR AND CATEGORY */}
			{!loading && data.length > 0 && (
				<div className="bg-white p-4 rounded-xl shadow">
					<ResponsiveContainer width="100%" height={400}>
						<LineChart data={trendData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip
								formatter={(value: any) =>
									typeof value === "number" ? value.toFixed(2) : value
								}
							/>
							<Line
								type="monotone"
								dataKey="total"
								strokeWidth={3}
								dot={{ r: 4 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}

			{/* Expenses trend data for selected category displayed as JSON */}
			<details className="p-4 bg-gray-100 rounded">
				<summary className="cursor-pointer font-bold">
					View trend data for "{category}" category
				</summary>
				<pre className="mt-2 overflow-auto">
					{JSON.stringify(data, null, 2)}
				</pre>
			</details>

			{/* EXPENSES TREND BY YEAR AND MONTH SECTION*/}
			<h1 className="text-xl font-bold">Trend data per year and month</h1>

			{/* FILTERS FOR TREND PIE BY YEAR AND MONTH SECTION*/}
			<div className="flex gap-4">
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="years-month"
				>
					Years
				</label>
				<select
					id="years-month"
					onChange={(e) => setYear(Number(e.target.value))}
					className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					{years.map((y) => (
						<option key={y}>{y}</option>
					))}
				</select>
				<label
					className="block text-gray-700 text-sm font-bold mb-2"
					htmlFor="months"
				>
					Months
				</label>
				<select
					id="months"
					onChange={(e) => setSelectedMonth(e.target.value)}
					className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				>
					{months.map((m) => (
						<option key={m}>{m}</option>
					))}
				</select>
			</div>

			{/* TREND PIE PLOT BY YEAR AND MONTH*/}
			{!loading && pieData.length > 0 && (
				<ResponsiveContainer width="100%" height={400}>
					<PieChart>
						<Pie
							data={pieData}
							dataKey="value"
							nameKey="name"
							outerRadius={120}
							label
						>
							{pieData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip
							formatter={(value: any) =>
								typeof value === "number" ? `€ ${value.toFixed(2)}` : value
							}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			)}

			{/* Expenses trend data for selected category displayed as JSON */}
			<details className="p-4 bg-gray-100 rounded">
				<summary className="cursor-pointer font-bold">
					View trend data by category for this year {year} and month
					{selectedMonth}
				</summary>
				<pre className="mt-2 overflow-auto">
					{JSON.stringify(pieData, null, 2)}
				</pre>
			</details>

			{/* 📌 CATEGORY INCIDENCE SECTION */}
			<hr className="my-8" />
			<h1 className="text-xl font-bold">📌 Category incidence by month</h1>

			{/* FILTERS FOR INCIDENCE */}
			<div className="flex gap-4 flex-wrap">
				<div className="flex-1 min-w-48">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="incidence-month"
					>
						Select month
					</label>
					<select
						id="incidence-month"
						onChange={(e) => setIncidenceMonth(e.target.value)}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="">-- Choose Month --</option>
						{months.map((m) => (
							<option key={m} value={m}>
								{m}
							</option>
						))}
					</select>
				</div>

				<div className="flex-1 min-w-48">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="incidence-category"
					>
						Select category
					</label>
					<select
						id="incidence-category"
						onChange={(e) => setIncidenceCategory(e.target.value)}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="">-- Choose Category --</option>
						{expensesCategory.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>
			</div>

			{incidenceLoading && <p className="mt-4">Loading...</p>}

			{/* INCIDENCE DATA DISPLAY */}
			{!incidenceLoading && incidenceData && (
				<>
					<div className="mt-6 bg-blue-50 p-6 rounded-xl">
						<h2 className="text-lg font-bold mb-4">
							📍 Category incidence "{incidenceCategory}" on {incidenceMonth}{" "}
							{year}
						</h2>

						<div className="grid grid-cols-3 gap-4 mb-6">
							<div className="bg-white p-4 rounded shadow">
								<p className="text-gray-600 text-sm">Total month</p>
								<p className="text-2xl font-bold">
									€ {incidenceData.totalMonth.toFixed(2)}
								</p>
							</div>

							<div className="bg-white p-4 rounded shadow">
								<p className="text-gray-600 text-sm">Total category in month</p>
								<p className="text-2xl font-bold">
									€ {incidenceData.categoryTotal.toFixed(2)}
								</p>
							</div>

							<div className="bg-white p-4 rounded shadow">
								<p className="text-gray-600 text-sm">Incidence percentage</p>
								<p className="text-2xl font-bold">
									{incidenceData.incidencePercentage.toFixed(2)}%
								</p>
							</div>
						</div>

						{/* BAR CHART FOR INCIDENCE */}
						<div className="bg-white p-4 rounded-lg shadow mt-6">
							<ResponsiveContainer width="100%" height={300}>
								<BarChart
									data={[
										{
											name: "Category",
											value: incidenceData.categoryTotal,
										},
										{
											name: "Total Month",
											value: incidenceData.totalMonth,
										},
									]}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip
										formatter={(value: any) =>
											typeof value === "number"
												? `€ ${value.toFixed(2)}`
												: value
										}
									/>
									<Bar dataKey="value" fill="#8884d8" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export async function getServerSideProps(
	context: GetSessionParams | undefined,
) {
	const session = await getSession(context);

	if (!session || !session.accessToken) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: { accessToken: session.accessToken },
	};
}

export default ExpensesTrend;
