"use client"
import { InputHTMLAttributes } from "react"
import { FormControl, FormField,FormItem, FormLabel, FormMessage } from "../ui/form"
import { useFormContext } from "react-hook-form"
import { Input } from "../ui/input"


type Props<S>={
    nameInSchema: keyof S & string,
    fieldTitle : string,
    className? : string
} & InputHTMLAttributes<HTMLInputElement>

export default function InputWithLabel<S>(
   { nameInSchema, fieldTitle,className ,...props }:Props<S>
){

    const myform=useFormContext();
    
    return (
        <FormField
            control={myform.control}
            name={nameInSchema}
            render={({field})=>(
                <FormItem>
                    <FormLabel
                        className="text-base"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <FormControl>
                    <Input
                            {...field}
                            {...props}
                            id={nameInSchema}
                            className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
                            
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}