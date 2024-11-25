"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ButtonHTMLAttributes } from "react";
type Props={
    title?:string,
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary",
    className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function BackButton(
    {title,variant,className,...props} : Props
)
{
    const router=useRouter();
    return (
        <Button 
            title={title}
            variant={variant}
            className={className}
            onClick={()=> router.back()}
        >
            {title}
        </Button>
    )
}