"use client"
import {  TextareaHTMLAttributes } from "react"
import { FormControl, FormField,FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"


type Props<S>={
    nameInSchema: keyof S & string,
    fieldTitle : string,
    className? : string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function TextAreaWithLabel<S>(
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
                    <Textarea
                            {...field}
                            {...props}
                            id={nameInSchema}
                            className={`w-full h-20 max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}