import { verifyPassword } from "@/helpers/auth";
import { PrismaClient } from "@prisma/client";
import NextAuth, { User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sign } from 'jsonwebtoken';
interface CustomUser extends User {
	access_token: string;
}

declare module 'next-auth' {
	interface Session {
	  accessToken?: string; 
	}
}
const prisma = new PrismaClient();
export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Sign in with",
			credentials: {
				Email: { label: "Email", type: "text", placeholder: "jsmith" },
				Password: { label: "Password", type: "password" },
			},
			async authorize(credentials): Promise<CustomUser | null> {
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
				const accessToken = sign({ id: existingUser.id, email: existingUser.Email, password:existingUser.Password }, 'your_super_secret_jwt_key', { expiresIn: '1h' });
				return {
					id: existingUser.id.toString(),
					email: existingUser.Email,
					access_token: accessToken,
				};
			},
		}),
	],
	callbacks: {
		async jwt ({token, user, session}){
			console.log('JWT Data :', {token, user, session});
			if(user){
				return { 
					...token,
					id:user.id,
				}
			}
			return token;
		},
		async session ({session, token, user}){
			console.log('SESSION DATA', {session, token, user});
			return {
				...session,
				user:{
					...session.user,
					id:token.id,
					token:token
				}
			};
			return session;
		}
	},
	secret:'your_super_secret_jwt_key',
	session: {
		strategy: 'jwt',
	},
});
