import { BsExclamationTriangle } from "react-icons/bs";


interface  FormErrorProps {
    message?: string;
}

export const FormError = ({
    message,
}: FormErrorProps) => {
    if(!message) return null;
    return (
        <div className="bg-destructive/15 px-3 py-1.5 text-red-600 rounded-full flex items-center gap-x-2 text-xs text-destructive">
            <BsExclamationTriangle className="h-3 w-3"/>
            <p>{message}</p>
        </div>
    )
}