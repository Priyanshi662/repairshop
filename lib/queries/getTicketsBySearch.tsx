import { db } from "@/app/drizzle";
import { customers, tickets } from "@/app/drizzle/schema";
import { eq, ilike, or } from "drizzle-orm";

export default async function getTicketBySearch(
    searchText:string
)
{
    const result= await db.select({
        ticketCreated: tickets.createdAt,
        title: tickets.title,
        Description:tickets.description,
        firstName: customers.firstname,
        lastName: customers.lastname,
        email: customers.email,
        tech: tickets.tech
    })
    .from(tickets)
    .leftJoin(customers,eq(customers.id,tickets.customerId))
    .where(or(
        ilike(tickets.tech,`%${searchText}%`),
        ilike(tickets.description,`%${searchText}%`),
        ilike(tickets.title,`%${searchText}%`),
        ilike(customers.firstname,`%${searchText}%`),
        ilike(customers.lastname,`%${searchText}%`),
        ilike(customers.address1,`%${searchText}%`),
        ilike(customers.phone,`%${searchText}%`),
        ilike(customers.state,`%${searchText}%`),
        ilike(customers.zipcode,`%${searchText}%`),
        ilike(customers.city,`%${searchText}%`),
        ilike(customers.address2,`%${searchText}%`),
        ilike(customers.email,`%${searchText}%`),
    ))
    return result;
}