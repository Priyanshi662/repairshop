import { db } from "@/app/drizzle";
import { customers } from "@/app/drizzle/schema";
import { ilike, or } from "drizzle-orm";

export default async function getCustomersBySearch(
    searchText:string
)
{
    const results= await db.select().from(customers).where(or(
        ilike(customers.firstname,`%${searchText}%`),
        ilike(customers.lastname,`%${searchText}%`),
        ilike(customers.address1,`%${searchText}%`),
        ilike(customers.phone,`%${searchText}%`),
        ilike(customers.state,`%${searchText}%`),
        ilike(customers.zipcode,`%${searchText}%`),
        ilike(customers.city,`%${searchText}%`),
        ilike(customers.address2,`%${searchText}%`),
        ilike(customers.email,`%${searchText}%`),
        ilike(customers.notes,`%${searchText}%`),
    ))
    return results;
}