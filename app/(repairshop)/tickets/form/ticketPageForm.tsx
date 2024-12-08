"use client"
import { customerSelectType } from "@/app/schemas/customers";
import { ticketInsertSchema, ticketInsertType, ticketSelectType } from "@/app/schemas/tickets";
import CheckBoxWithLabel from "@/components/inputs/CheckboxWithLabel";
import InputWithLabel from "@/components/inputs/InputWithLabel";
import SelectWithLabel from "@/components/inputs/SelectWithLabel";
import TextAreaWithLabel from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {useAction} from "next-safe-action/hooks";
import { saveTicketAction } from "@/app/actions/saveTicketAction";
import { DisplayServerActionResponse } from "@/components/displayServerActionResponse";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type props=
{
    customer: customerSelectType,
    ticket?: ticketSelectType,
    techs?:{
        id:string,
        description:string
    }[],
    isEditable?: boolean
}
export default function TicketForm({customer,ticket,techs,isEditable=true}:props)
{
    const {toast}= useToast();
    const {execute,result, isPending, reset}= useAction(saveTicketAction,{
        onSuccess({data}){
            if(data?.message)
           { 
            toast({
                title:"Saved Successfully",
                description:data.message,
                variant:"default"
            })
        }
        },
        onError({error}){
            toast({
                title:"Error!",
                description:"Ticket could not be created",
                variant:"destructive"
            })
        }
    })
    ;

    const defaultValues :ticketInsertType={
        id : ticket?.id ?? '(New)',
        customerId: customer.id ?? 0,
        title: ticket?.title ?? "",
        description: ticket?.description ?? "",
        completed: ticket?.completed ?? false,
        tech : ticket?.tech ?? "new-ticket@example.com"
    };
    const isManager= Array.isArray(techs);
    const myform = useForm<ticketInsertType>({
        mode:"onBlur",
        resolver: zodResolver(ticketInsertSchema),
        defaultValues
    })

    async function submitForm(data: ticketInsertType){
        execute(data);
    }

    return(
        <div>
            <div className="m-4">
                <DisplayServerActionResponse result={result}/>
                <h2 className="text-2xl font-bold">
                    {
                        (ticket?.id && isEditable)?
                            (`Edit Ticket #${ticket.id}`):
                            ( ticket?.id? 
                            `View Ticket #${ticket.id}`:
                            "Create New Ticket"
                            )
                    }
                </h2>
            </div>
            <Form {...myform}>
                    <form onSubmit={myform.handleSubmit(submitForm)}
                    className="flex flex-row w-full gap-4"
                    >
                            <div className="flex flex-col p-4 gap-4 w-full max-w-xs">
                            
                            <div className=" mt-4 space-y-2">
                                <h3>Customer Info</h3>
                                <hr className="w-4/5"/>
                                <p>{customer.firstname} {customer.lastname}</p>
                                <p>{customer.address1}</p>
                                {customer.address2? <p>{customer.address2}</p>: null}
                                <p>{customer.city}, {customer.state} - {customer.zipcode}</p>
                                <hr className="w-4/5"/>
                                <p>{customer.email}</p>
                                <p>Phone:  {customer.phone}</p>
                            </div>
                            </div>
                            
                            <div className="flex flex-col p-4 gap-4 w-full max-w-xs">
                            <InputWithLabel<ticketInsertType>
                                fieldTitle="Title"
                                nameInSchema="title"
                                disabled={!isEditable}
                            />
                           {
                            isManager?
                            (
                                <SelectWithLabel
                                    fieldTitle="Tech ID"
                                    nameInSchema="tech"
                                    data={[{id:"new-ticket@example.com",description:"new-ticket@example.com"},...techs!]}
                                />
                            )
                            :
                            (
                                <InputWithLabel<ticketInsertType>
                                fieldTitle="Tech"
                                nameInSchema="tech"
                                disabled={true}
                            />
                            )
                           }
                           {
                            ticket?.id?(
                            <CheckBoxWithLabel<ticketInsertType>
                                nameInSchema="completed"
                                fieldTitle="Status"
                                message="completed"
                                disabled={!isEditable}
                            />)
                            :
                            null
                            }
                                <TextAreaWithLabel<ticketInsertType>
                                    fieldTitle="Description"
                                    nameInSchema="description"
                                    className="h-32"
                                    disabled={!isEditable}
                                />
                                {
                                    isEditable?
                                 (<div className="flex flex-row gap-2">
                                    <Button type="submit" variant="default" title="Save" className="w-3/4" disabled={isPending}>
                                        {
                                            isPending? <><LoaderCircle className="animate-spin"/>Loading..</>: "Save"
                                        }
                                    </Button>
                                    <Button type="button" variant="destructive" 
                                        title="Reset" className="w-full" 
                                        onClick={()=> {
                                            myform.reset(defaultValues)
                                            reset()
                                        } }
                                    >
                                        Reset
                                    </Button>
                                </div>)
                                :
                                null
                                }
                            </div>
                    </form>
                </Form>
        </div>
    )
}