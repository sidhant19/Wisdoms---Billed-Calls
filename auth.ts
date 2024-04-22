import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config";
import {getUserByid} from "@/data/user";
import {UserRole} from "@prisma/client";


declare module "next-auth" {
    interface User {
        // Add your additional properties here:
        givenName?: string | null;
        preferLanguage?: string | null;
        role?: UserRole;
    }
}
export const{
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    // pages: {
    //     signIn: '/login',
    //     signOut: '/logout',
    //     error: '/error',
    //
    // },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()},
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {
            if(account?.provider!=="credentials") return true;
            if (user.id) {
                const existingUser = await getUserByid(user.id);
                if (!existingUser?.emailVerified) return false;
            }

            //TODO 2FA CHECK
            return true;

        },
        async session({session, token}) {

            if(token.sub && session.user) {
               session.user.id = token.sub;
           }
            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }
            return session;

        },
        async jwt({token}) {
            if(!token.sub) return token;
            const existingUser = await getUserByid(token.sub);
            if(!existingUser) return token;
            token.role= existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
});

