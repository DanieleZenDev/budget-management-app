import { GetSessionParams, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

const HomePage = () => {
	return (
		<Fragment>
			<Head>
				<title>Budget Management App</title>
				<meta
					name="description"
					content="Manage your expenses, incomes, and savings with ease"
				/>
			</Head>

			<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
				<div className="max-w-6xl mx-auto">
					{/* HEADER */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							💰 Budget Management App
						</h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Take control of your finances. Easily manage and track your
							expenses, incomes, and savings all in one place.
						</p>
					</div>

					{/* FEATURES SECTION */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
						{/* EXPENSES CARD */}
						<Link href="/expenses">
							<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-red-500">
								<div className="text-4xl mb-4">💸</div>
								<h2 className="text-2xl font-bold text-gray-900 mb-3">
									Expenses
								</h2>
								<p className="text-gray-600 mb-6">
									Track all your spending across multiple categories. Monitor
									where your money goes and identify spending patterns.
								</p>
								<button className="text-red-600 font-semibold hover:text-red-700">
									Manage Expenses →
								</button>
							</div>
						</Link>

						{/* INCOMES CARD */}
						<Link href="/incomes">
							<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-green-500">
								<div className="text-4xl mb-4">💵</div>
								<h2 className="text-2xl font-bold text-gray-900 mb-3">
									Incomes
								</h2>
								<p className="text-gray-600 mb-6">
									Record all your income sources from salary to side gigs. Keep
									track of your earnings organized by category.
								</p>
								<button className="text-green-600 font-semibold hover:text-green-700">
									Manage Incomes →
								</button>
							</div>
						</Link>

						{/* SAVINGS CARD */}
						<Link href="/savings">
							<div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-blue-500">
								<div className="text-4xl mb-4">🏦</div>
								<h2 className="text-2xl font-bold text-gray-900 mb-3">
									Savings
								</h2>
								<p className="text-gray-600 mb-6">
									Set savings goals and track your progress. Organize savings by
									purpose and watch your wealth grow over time.
								</p>
								<button className="text-blue-600 font-semibold hover:text-blue-700">
									Manage Savings →
								</button>
							</div>
						</Link>
					</div>

					{/* ANALYTICS SECTION */}
					<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-xl mb-16">
						<h2 className="text-3xl font-bold mb-4">📊 Analyze Your Data</h2>
						<p className="text-lg mb-6 max-w-2xl">
							Dive deep into your financial data with powerful trend analysis
							and detailed reports. Understand your spending habits and optimize
							your budget.
						</p>
						<Link href="/expensesTrend">
							<button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
								View Analytics →
							</button>
						</Link>
					</div>

					{/* KEY FEATURES */}
					<div className="mb-16">
						<h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
							Key Features
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex items-start gap-4">
								<span className="text-3xl">✅</span>
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Easy Data Entry
									</h3>
									<p className="text-gray-600">
										Quick and intuitive forms to add expenses, incomes, and
										savings with just a few clicks.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<span className="text-3xl">📈</span>
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Trend Analysis
									</h3>
									<p className="text-gray-600">
										Visualize your financial data with charts and graphs to spot
										trends and patterns.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<span className="text-3xl">🏷️</span>
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Category Organization
									</h3>
									<p className="text-gray-600">
										Organize transactions by category for better financial
										management and insights.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<span className="text-3xl">🔐</span>
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Secure & Private
									</h3>
									<p className="text-gray-600">
										Your financial data is secure and only accessible to you
										with authentication.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export async function getServerSideProps(
	context: GetSessionParams | undefined,
) {
	const session = await getSession(context);

	//Redirect to home if not logged in (optional - you can also allow public access)
	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default HomePage;
