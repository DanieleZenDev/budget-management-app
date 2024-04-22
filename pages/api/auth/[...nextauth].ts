import { verifyPassword } from "@/helpers/auth";
import { PrismaClient } from "@prisma/client";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const prisma = new PrismaClient();
export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Sign in with",
			credentials: {
				Email: { label: "Email", type: "text", placeholder: "jsmith" },
				Password: { label: "Password", type: "password" },
			},
			async authorize(credentials): Promise<User | null> {
				const existingUser = await prisma.user.findFirst({
					where: { Email: credentials?.Email },
				});
				if (!existingUser) {
					return null;
				}
				if (credentials?.Password === undefined) {
					throw new Error("Password not provided");
				}

				const isValidPsw = await verifyPassword({
					enteredPassword: credentials.Password,
					hashedPassword: existingUser.Password,
				});
				if (!isValidPsw) {
					throw new Error("Could not proceed with login");
				}

				return {
					id: existingUser.id.toString(),
					email: existingUser.Email,
				};
			},
		}),
	],
});
