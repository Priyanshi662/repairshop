"use client"
import { FormControl, FormField,FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

type dataObj={
    id:string,
    description:string
}

type Props<S>={
    nameInSchema: keyof S & string,
    fieldTitle : string,
    className? : string
    data:dataObj[],
} 

export default function SelectWithLabel<S>(
   { nameInSchema, fieldTitle,className,data }:Props<S>
)
{
    const [isOpen,setIsOpen]= useState(false);
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
                    <Select
                        {...field}
                        onValueChange={field.onChange}
                        onOpenChange={setIsOpen}
                    >
                    <FormControl>
                        <SelectTrigger 
                        id={nameInSchema}
                        className={`w-full max-w-xs ${className}`}
                        
                        >
                            <SelectValue placeholder="Select" />
                            {isOpen? (
                                            <ChevronUp className="h-4 w-4"/>
                                        ):
                                        (
                                            <ChevronDown className="h-4 w-4"/>
                                        )
                            }
                        </SelectTrigger>
                    </FormControl>
                        <SelectContent>
                            {data.map((item)=>(
                                <SelectItem 
                                    key={`${item.id}`}
                                    value={`${item.id}`}
                                >
                                    {item.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}