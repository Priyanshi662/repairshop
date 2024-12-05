"use client"
import { customerInsertSchema, customerInsertType , customerSelectType} from "@/app/schemas/customers"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import { Button } from "@/components/ui/button";
import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import { INDIAN_STATES } from "@/constants/states";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import CheckBoxWithLabel from "@/components/inputs/CheckboxWithLabel";

type Props= {
    customer?: customerSelectType
}
export default function CustomerFormPage({customer}:Props){
    const {getPermission,isLoading}= useKindeBrowserClient();
    const isManager= !isLoading && getPermission('manager')?.isGranted;
    
    const defaultValues: customerInsertType ={
        firstname : customer?.firstname ?? "",
        lastname  : customer?.lastname ?? "",
        email     : customer?.email  ?? "",
        phone     : customer?.phone  ?? "",
        address1  : customer?.address1 ?? "",
        city      : customer?.city ?? "",
        state     : customer?.state ?? "",
        zipcode   : customer?.zipcode?? "",
        id        : customer?.id ?? 0,
        address2  : customer?.address2 ??"",
        notes     : customer?.notes ?? ""
    };

    const myform=useForm<customerInsertType>(
        {
            mode: 'onBlur',
            resolver: zodResolver(customerInsertSchema),
            defaultValues
        }
    );

    async function submitForm(data : customerInsertType){
        console.log(data);
    }
    useEffect(()=>{
        console.log(defaultValues);
    },[])
    return(
        <div className="flex flex-col gap-1 sm:px-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">
                {customer?.id ?("Edit"): ("New")} Customer Form
                </h2>
            </div>
            <Form {...myform}>
                <form onSubmit={myform.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8 w-full"
                >   
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<customerInsertType>
                            fieldTitle="First Name"
                            nameInSchema="firstname"
                        />
                        <InputWithLabel<customerInsertType>
                            fieldTitle="Last Name"
                            nameInSchema="lastname"
                        />
                        <InputWithLabel<customerInsertType>
                            fieldTitle="Address 1"
                            nameInSchema="address1"
                        />
                        <InputWithLabel<customerInsertType>
                            fieldTitle="Address 2"
                            nameInSchema="address2"
                        />
                        <InputWithLabel<customerInsertType>
                            fieldTitle="City"
                            nameInSchema="city"
                        />
                        <SelectWithLabel<customerInsertType>
                                fieldTitle="State"
                                nameInSchema="state"
                                data={INDIAN_STATES}
                            />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        
                        <InputWithLabel<customerInsertType>
                            fieldTitle="Zip Code"
                            nameInSchema="zipcode"
                        />
                        <InputWithLabel<customerInsertType>
                            fieldTitle="Phone"
                            nameInSchema="phone"
                        />
                        <InputWithLabel<customerInsertType>
                            fieldTitle="Email"
                            nameInSchema="email"
                        />
                        <TextAreaWithLabel
                            fieldTitle="Notes"
                            nameInSchema="notes"
                            className="h-32"
                        />
                        {isLoading? <p>Loading...</p> : (isManager?
                            <CheckBoxWithLabel
                                fieldTitle="Active"
                                nameInSchema="active"
                                message="Active"
                            />
                            : null
                        )}
                        <div className="flex flex-row gap-2">
                        <Button type="submit" variant="default" title="Save" className="w-3/4">
                            Save
                        </Button>
                        <Button type="button" variant="destructive" 
                                title="Reset" className="w-full" 
                                onClick={()=> myform.reset(defaultValues)}
                        >
                            Reset
                        </Button>
                        
                    </div>
                    </div>
                    
                 </form>
                </Form>
        </div>
    )
}