import { CiCircleCheck } from "react-icons/ci";


interface  FormSuccessProps{
    message?: string;
}

export const FormSuccess = ({
    message,
}: FormSuccessProps) => {
    if(!message) return null;
    return (
        <div className="bg-emerald-500/15 px-3 py-1.5 text-emerald-500 rounded-full flex items-center gap-x-2 text-xs text-destructive">
            <CiCircleCheck className="h-3 w-3"/>
            <p>{message}</p>
        </div>
    )
}