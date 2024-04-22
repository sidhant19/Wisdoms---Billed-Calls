import type { NextAuthConfig } from "next-auth"
import Credentials  from "next-auth/providers/credentials";
import {LoginSchema} from "@/schema";
import {getUserByEmail} from "@/data/user";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter"
import LinkedIn from "next-auth/providers/linkedin"
var bcrypt = require('bcryptjs');
export default {
    secret: "Ia+BVSD5EndzVsdpoIG8PR/a9g1XHFYVB9xSlPeKlnA=",
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if(validatedFields.success){
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if(!user || !user.password){
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) return user;
                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig