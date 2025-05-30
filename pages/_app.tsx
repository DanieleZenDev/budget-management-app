import { SessionProvider } from "next-auth/react";

import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {

	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}


