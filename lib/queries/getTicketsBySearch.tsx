import { db } from "@/app/drizzle";
import { customers, tickets } from "@/app/drizzle/schema";
import { eq, ilike, or, sql, asc } from "drizzle-orm";

export default async function getTicketBySearch(
    searchText:string
)
{
    const result= await db.select({
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
    .leftJoin(customers,eq(customers.id,tickets.customerId))
    .where(or(
        ilike(tickets.tech,`%${searchText}%`),
        ilike(tickets.title,`%${searchText}%`),
        ilike(customers.phone,`%${searchText}%`),
        ilike(customers.zipcode,`%${searchText}%`),
        ilike(customers.city,`%${searchText}%`),
        ilike(customers.email,`%${searchText}%`),
        sql
            `lower(concat(${customers.firstname},' ',${customers.lastname})) 
            LIKE 
            ${`%${searchText.toLowerCase().replace(' ','%')}%`}`
    ))
    .orderBy(asc(tickets.createdAt))
    return result;
}

export type TicketSearchResultsType= Awaited<ReturnType<typeof getTicketBySearch>>