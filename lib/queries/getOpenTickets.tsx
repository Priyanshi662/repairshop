
import { db } from "@/app/drizzle"
import { customers, tickets } from "@/app/drizzle/schema"
import { asc, eq } from "drizzle-orm"

export default async function getOpenTickets() {
    const results = await db.select({
        id: tickets.id,
        ticketCreated: tickets.createdAt,
        title: tickets.title,
        firstName: customers.firstname,
        lastName: customers.lastname,
        email: customers.email,
        tech: tickets.tech,
        completed:tickets.completed
    })
        .from(tickets)
        .leftJoin(customers, eq(tickets.customerId, customers.id))
        .where(eq(tickets.completed, false))
        .orderBy(asc(tickets.createdAt));
        
    return results
}   