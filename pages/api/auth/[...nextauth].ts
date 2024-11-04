import generateUniqueId, { verifyPassword } from "@/helpers/auth";
import { PrismaClient } from "@prisma/client";
import NextAuth, { User } from "next-auth";
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
				Name: { label: "Name", type: "text", placeholder: "Your Name" }
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
				
				const uniqueUserId = generateUniqueId(existingUser.id, existingUser.Email);
				const accessToken = sign({ id: uniqueUserId, email: existingUser.Email, password:existingUser.Password , name:existingUser.Name }, 'your_super_secret_jwt_key', { expiresIn: '30m' });
			
				await prisma.user.update({
					where: { id: existingUser.id }, 
					data: {
						UserID: uniqueUserId
					}
				});

				return {
					id: existingUser.id.toString(),
					email: existingUser.Email,
					name:  existingUser.Name,
					access_token: accessToken,
				};
			},
		}),
	],
	callbacks: {
		async jwt ({token, user, session}){
			if(user){
				const customUser = user as CustomUser; 
            
            	return {
                	...token,
                	id: customUser.id,              
                	accessToken: customUser.access_token,
					iat: token.iat,
					exp: token.exp,			
            	};
			}
			return token;
		},
		async session ({session, token, user}){
			return {
				...session,
				user:{
					...session.user,
					id:token.id,
					token:token.access_token,
				},
				accessToken: token.accessToken,
				iat: token.iat,  
				exp: token.exp,
			};
			
			//return session;
		}
	},
	secret:'your_super_secret_jwt_key',
	session: {
		strategy: 'jwt',
	},
});
