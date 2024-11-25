import { db } from "@/app/drizzle";
import { customers } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function getCustomer(id:number)
{
    const customer = await db.select().from(customers).where(eq(customers.id,id));
    return customer[0];
}