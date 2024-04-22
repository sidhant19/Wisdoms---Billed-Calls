"use server";

var bcrypt = require('bcryptjs');
import * as z from "zod";
import {RegisterSchema} from "@/schema";
import {db} from "@/lib/db";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid Fields!"};

    }
    const {email, password, name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    });

    if(existingUser){
        return {error: "Email Already Exists!"};
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });


    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    // TODO SEND VERIFICATION MAIL
    return {success: "Verification Mail Sent!" };
}

