import {Resend} from "resend";

const resend = new Resend(process.env.RESENS_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http:localhost:3000/new-verification?token=${token}`;
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Please verify your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
    });
}