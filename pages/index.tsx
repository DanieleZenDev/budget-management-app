import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
		>
			<div>
				<h1>Home page</h1>
			</div>
		</main>
	);
}
