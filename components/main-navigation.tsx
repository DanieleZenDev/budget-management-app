import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
// import { useEffect } from "react";

const MainNavigation = () => {
	const { data: session, status} = useSession();
	console.log('datas',session);
	
	// useEffect(() => {
	// 	if (!session || !session.exp) return;

    //     const expirationTime = session.exp * 1000; 
    //     const timeUntilExpiration = expirationTime - Date.now();
    //     if (timeUntilExpiration <= 0) {
    //         alert('La sessione è scaduta. Effettua di nuovo il login.');
    //         signOut(); 
    //     } else {
    //         const timeoutId = setTimeout(() => {
    //             alert('La sessione è Scaduta. Effettua di nuovo il login.');
    //             signOut();
    //         }, timeUntilExpiration);

    //         return () => clearTimeout(timeoutId); 
    //     }
    // }, [session, status]);

	return (
		<header>
			<nav>
				<ul className="flex justify-between p-12">
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
