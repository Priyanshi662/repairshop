"use client"
import { customerSelectType } from "@/app/schemas/customers";
import { ticketInsertSchema, ticketInsertType, ticketSelectType } from "@/app/schemas/tickets";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";

type props=
{
    customer: customerSelectType,
    ticket?: ticketSelectType
}
export default function TicketForm({customer,ticket}:props)
{
    const defaultValues :ticketInsertType={
        id : ticket?.id ?? '(New)',
        customerId: customer.id ?? 0,
        title: ticket?.title ?? "",
        description: ticket?.description ?? "",
        completed: ticket?.completed ?? false,
        tech : ticket?.tech ?? ""
    };
    const myform = useForm<ticketInsertType>({
        mode:"onBlur",
        resolver: zodResolver(ticketInsertSchema),
        defaultValues
    })

    async function submitForm(data: ticketInsertType){
        console.log(data)
    }
    return(
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">
                    {ticket?.id? ("Edit") : ("New")}
                        Ticket 
                    {ticket?.id ? `# ${ticket.id}` : "Form"}
                </h2>
            </div>
            <Form {...myform}>
                    <form onSubmit={myform.handleSubmit(submitForm)}>
                        <p>{JSON.stringify(myform.getValues())}</p>
                    </form>
                </Form>
        </div>
    )
}