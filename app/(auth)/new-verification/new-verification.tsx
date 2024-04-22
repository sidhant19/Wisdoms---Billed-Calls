"use client";

import { BounceLoader } from "react-spinners";
import {useCallback, useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";

import {newVerification} from "@/actions/new-verification";

export const NewVerification = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() =>  {
        if(success || error) return;
        if(!token){

            setError("Invalid Token!");
            return;
        }
        newVerification(token).then((data)=>{
            setSuccess(data.success);
            setError(data.error);
        })
            .catch(()=>{
                setError("Something went wrong!");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);
    return (

        <Card className="mt-24 overflow-auto scale-125 bg-opacity-20 flex flex-col items-center  justify-start bg-rose-500 rounded-3xl border-card">
            <CardHeader>
                <h1 className="text-2xl font-light text-center mb-1">Confirming Verification<span className='text-rose-500'>.</span></h1>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="w-full flex items-center justify-center">
                    {!success && !error && (<BounceLoader color="#E11D48" />)}
                    <FormSuccess message={success} />
                    {!success && (<FormError message={error} />)}


                </div>





            </CardContent>


        </Card>


    )
}