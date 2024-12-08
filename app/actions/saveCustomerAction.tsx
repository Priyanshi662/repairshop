"use server"

import { actionClient } from "@/lib/hooks/safe-action"
import { customerInsertSchema, customerInsertType } from "../schemas/customers"
import { flattenValidationErrors } from "next-safe-action"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "../drizzle"
import { customers } from "../drizzle/schema"
import { eq } from "drizzle-orm"

export const saveCustomerAction=actionClient
.metadata({actionName:"save customer"})
.schema(customerInsertSchema,
    {handleValidationErrorsShape: async (ve)=> flattenValidationErrors(ve).fieldErrors})
.action(async (
        {parsedInput: customer}:{parsedInput: customerInsertType}
    )=>{
        const {isAuthenticated}= getKindeServerSession();
        const isAuth= await isAuthenticated();
        if(!isAuth)
            redirect("/login");
        if(customer.id===0)
        {
            // New Customer:
            const result= await db.insert(customers).values({
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email,
                phone: customer.phone,
                address1: customer.address1,
                ...(customer.address2?.trim()?{address2: customer.address2}:{}),
                city: customer.city,
                state: customer.state,
                zipcode: customer.zipcode,
                ...(customer.notes?.trim()? {notes: customer.notes}:{})
            }).returning({insertedId: customers.id})
            return {message:`Customer ID #${result[0].insertedId} Added`}
        }
        else
        {
            const result= await db.update(customers).set({
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email,
                phone: customer.phone,
                address1: customer.address1,
                address2: customer.address2?.trim() ?? null,
                city: customer.city,
                state: customer.state,
                zipcode: customer.zipcode,
                notes: customer.notes?.trim() ?? null,
                active: customer.active
            }).where(eq(customers.id,customer.id!))
            .returning({updatedId: customers.id})
            return {message:`Customer ID #${result[0].updatedId} Updated`}
        }
}) 