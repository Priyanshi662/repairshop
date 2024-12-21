
import { db } from "@/app/drizzle"
import { customers, tickets } from "@/app/drizzle/schema"
import { eq } from "drizzle-orm"

export default async function getOpenTickets() {
    const results = await db.select({
        ticketDate: tickets.createdAt,
        title: tickets.title,
        firstName: customers.firstname,
        lastName: customers.lastname,
        email: customers.email,
        tech: tickets.tech,
    })
        .from(tickets)
        .leftJoin(customers, eq(tickets.customerId, customers.id))
        .where(eq(tickets.completed, false))

    return results
}   