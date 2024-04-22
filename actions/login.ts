"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import {getUserByEmail} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields){
        return {error: "Invalid Fields!"};

    }
    if (validatedFields.success) {
        const {email, password} = validatedFields.data;

        const existingUser = await getUserByEmail(email);

        if(!existingUser || !existingUser.password || !existingUser.email){
            return {error: "Invalid Email or Password!"};
        }

        if(!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email);
            await sendVerificationEmail(verificationToken.email, verificationToken.token);
            return {success: "Verification Mail Sent!" };
        }


        try {
            await signIn("credentials", {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT,
            });
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return {error: "Invalid Email or Password!"};
                    default:
                        return {error: "An Error Occurred!"};
                }
            }
            throw error;
        }
    }

}

