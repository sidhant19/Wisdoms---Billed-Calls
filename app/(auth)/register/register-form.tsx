"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schema";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaGoogle, FaLinkedin, FaTwitter, FaApple } from "react-icons/fa";
import { register } from "@/actions/register"
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {useState, useTransition} from "react";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "@/route";


export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    };

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success)
                })
        });
    }

    return (

        <Card className="mt-24 overflow-auto scale-125 bg-opacity-20 flex flex-col items-center  justify-start bg-rose-500 rounded-3xl border-card">
            <CardHeader>
                <h1 className="text-2xl font-light text-center mb-1">Sign Up<span className='text-rose-500'>.</span></h1>
            </CardHeader>

            <CardContent >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                        <div className="space-y-2.5">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        {/*<FormLabel className="text-sm">Email</FormLabel>*/}
                                        <FormControl>
                                            <Input {...field}
                                                   disabled = {isPending}


                                                   placeholder="Name"
                                                   className=" bg-input w-full h-1/6 text-xs font-light text-left rounded-2xl"
                                                   required

                                            />

                                        </FormControl>
                                        <FormMessage className="text-2xs text-red-600 font-light" />

                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        {/*<FormLabel className="text-sm">Email</FormLabel>*/}
                                        <FormControl>
                                            <Input {...field}
                                                disabled = {isPending}

                                                type="email"
                                                placeholder="Email"
                                                className=" bg-input w-full h-1/6 text-xs font-light text-left rounded-2xl"
                                                required

                                            />

                                        </FormControl>
                                        <FormMessage className="text-2xs text-red-600 font-light" />

                                    </FormItem>
                                )}

                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        {/*<FormLabel className="text-sm">Password</FormLabel>*/}
                                        <FormControl>
                                            <Input {...field}
                                                   disabled = {isPending}

                                                   type="password"
                                                   placeholder="Password"
                                                   className=" bg-input w-full h-1/6 text-xs font-light text-left rounded-2xl"
                                                   required
                                            />

                                        </FormControl>
                                        <FormMessage className="text-2xs text-red-600 font-light" />

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        {/*<FormLabel className="text-sm">Password</FormLabel>*/}
                                        <FormControl>
                                            <Input {...field}
                                                   disabled = {isPending}

                                                   type="password"
                                                   placeholder="Confirm Password"
                                                   className=" bg-input w-full h-1/6 text-xs font-light text-left rounded-2xl"
                                                   required
                                            />

                                        </FormControl>
                                        <FormMessage className="text-2xs text-red-600 font-light" />

                                    </FormItem>
                                )}

                            />


                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button
                            disabled = {isPending}
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="w-full hover:bg-rose-700 font-light"
                        >
                            Register
                        </Button>
                        <Button variant="outline" size="sm" disabled = {isPending}  onClick={() => onClick("google")} className="w-full hover:text-rose-500 hover:bg-black gap-x-2">
                            <FaGoogle /><p className="font-light">Sign up with Google</p>
                        </Button>

                    </form>

                </Form>



            </CardContent>





            <CardFooter>
                <Button variant="link" disabled = {isPending} className="font-normal text-gray-400 hover:text-rose-500 w-full text-2xs" size="sm" asChild>
                    <Link href="/login">
                        <p>Already have an account? Signin</p>
                    </Link>

                </Button>
            </CardFooter>
        </Card>


    )
}