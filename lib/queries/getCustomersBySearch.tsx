import { db } from "@/app/drizzle";
import { customers } from "@/app/drizzle/schema";
import { ilike, or, sql } from "drizzle-orm";

export default async function getCustomersBySearch(
    searchText:string
)
{
    const results= await db.select().from(customers).where(or(
        ilike(customers.phone,`%${searchText}%`),
        ilike(customers.zipcode,`%${searchText}%`),
        ilike(customers.city,`%${searchText}%`),
        ilike(customers.email,`%${searchText}%`),
        sql `
            lower(concat(${customers.firstname},' ',${customers.lastname})) LIKE ${`%${searchText.toLowerCase().replace(' ','%')}%`}
        `
    ))
    return results;
}