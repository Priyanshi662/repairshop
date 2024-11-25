import { db } from "@/app/drizzle";
import { tickets } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function getTicket(id:number)
{
    const Ticket = await db.select().from(tickets).where(eq(tickets.id,id));
    return Ticket[0];
}