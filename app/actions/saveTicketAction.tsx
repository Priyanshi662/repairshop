"use server"
import { actionClient } from "@/lib/hooks/safe-action";
import { ticketInsertSchema, ticketInsertType } from "../schemas/tickets"
import { flattenValidationErrors } from "next-safe-action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../drizzle";
import { tickets } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const saveTicketAction= actionClient.
metadata({actionName:'save ticket'})
.schema(ticketInsertSchema,
    {handleValidationErrorsShape: async (ve)=> flattenValidationErrors(ve)}
)
.action(async ({parsedInput: ticket}:{parsedInput:ticketInsertType})=>{
    const {isAuthenticated} = getKindeServerSession();
    const isAuth=await isAuthenticated();
    if(!isAuth)
        redirect('/login');
    if(ticket.id==='(New)')
    {
        const res= await db.insert(tickets).values({
            customerId: ticket.customerId,
            title: ticket.title,
            ...(ticket.tech?.trim()? {tech: ticket.tech}: {}),
            ...(ticket.description?.trim()? {description: ticket.description}: {}),
            completed: ticket.completed
        }).returning({"createdTicketId": tickets.id})
        return {message: `Created Ticket ID# ${res[0].createdTicketId}`};
    }
    else
    {
        const res=await db.update(tickets).set({
            title:ticket.title,
            tech: ticket.tech ?? "new-ticket@example.com",
            description: ticket.description ?? "",
            customerId: ticket.customerId
        })
        .where(eq(tickets.id,ticket.id!))
        .returning({"updatedTicketId": tickets.id});
        return {message:`Updated Ticket ID# ${res[0].updatedTicketId}`};
    }
})