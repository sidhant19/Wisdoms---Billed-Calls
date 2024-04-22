import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "Email Required"
  }).email({
    message: "Invalid Email"
  }),
    password: z.string().min(1, {
      message:"Password Required"
    })
});

export const RegisterSchema = z.object({
  email: z.string().min(1, {
    message: "Email Required"
  }).email({
    message: "Invalid Email"
  }),
  password: z.string().min(8, {
    message:"Password min - 8 Chars"
  }),
  confirmPassword: z.string().min(8, {
    message:"Password min - 8 Chars"
  }),
  name: z.string().min(1, {
    message: "Name Required"
  })
}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
);