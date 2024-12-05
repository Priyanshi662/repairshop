"use client"
import { FormControl, FormField,FormItem, FormLabel, FormMessage } from "../ui/form"
import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"

type Props<S>={
    nameInSchema: keyof S & string,
    fieldTitle : string,
    message : string,
    disabled?: boolean
}


export default function CheckBoxWithLabel<S>(
    { nameInSchema, fieldTitle,message,disabled=false }:Props<S>
 ){
 
     const myform=useFormContext();
     
     return (
         <FormField
             control={myform.control}
             name={nameInSchema}
             render={({field})=>(
                 <FormItem className="w-full flex items-center gap-2">
                     <FormLabel
                          className="text-base w-1/3 mt-2"
                         htmlFor={nameInSchema}
                     >
                         {fieldTitle}
                     </FormLabel>
                     <div className="flex gap-2 items-center">
                     <FormControl>
                     <Checkbox
                        id={nameInSchema}
                        {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                     />
                     </FormControl>
                     {message}
                     </div>
                     <FormMessage/>
                 </FormItem>
             )}
         />
     )
 }