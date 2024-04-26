import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
		>
			<div className="border border-orange-300 flex-1">
				<h1>Expenses</h1>
				<p>All expenses import for category:..</p>
				<p>All expenses import for month/year:..</p>
			</div>

			<div className="border border-orange-300 flex-1">
				<h1>Incomes</h1>
				<p>All incomes import for category:..</p>
				<p>All incomes import for month/year:..</p>
			</div>

			<div className="border border-orange-300 flex-1">
				<h1>Savings</h1>
				<p>All savings import for category:..</p>
				<p>All savings import for month/year:..</p>
			</div>
		</main>
	);
}
