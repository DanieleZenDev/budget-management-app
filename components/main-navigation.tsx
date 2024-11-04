import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const MainNavigation = () => {
	const { data: session, status} = useSession();

	return (
		<header>
			<nav>
				<ul className={`flex justify-between p-12`}>
					<li>
						<Link href="/">Budget analysis</Link>
					</li>
					<li>
						<Link href="/expenses">Expenses</Link>
					</li>
					<li>
						<Link href="/incomes">Incomes</Link>
					</li>
					<li>
						<Link href="/savings">Savings</Link>
					</li>

					{session && (
						<div>
							Signed in as {session?.user?.name} <br />
							<button onClick={() => signOut()}>Sign out</button>
						</div>
					)}
					{!session && (
						<li>
							<Link href="/auth">Log in/ Sign up</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
