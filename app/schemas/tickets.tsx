import {createInsertSchema, createSelectSchema} from "drizzle-zod"
import { tickets } from "../drizzle/schema"
import {z} from "zod"

   
export const ticketInsertSchema=createInsertSchema(tickets,{
    id:     z.union([z.number(),z.literal("(New)")]),
    title:  z.string().min(2,"Invalid title"),
    tech:   z.string().email("Invalid email address")
});

export const ticketSelectSchema=createSelectSchema(tickets);

export type ticketSelectType= typeof ticketSelectSchema._type;
export type ticketInsertType= typeof ticketInsertSchema._type;
