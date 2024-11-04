// types/next.d.ts
import { NextApiRequest } from 'next';
import { DefaultSession } from "next-auth";
declare module 'next' {
    
    declare module "next-auth" {
      interface Session {
        user?: {
          id: string;
        } & DefaultSession["user"];
      }
    }
    interface NextApiRequest {
        userId?: string | JwtPayload;  
    }
}
