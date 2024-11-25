import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const customers= pgTable("customers",{
    id: serial("id").primaryKey(),
    firstname: varchar("first_name").notNull(),
    lastname: varchar("last_name").notNull(),
    email: varchar("email").unique().notNull(),
    phone: varchar("phone").unique().notNull(),
    address1: varchar("address1").notNull(),
    address2: varchar("address2"),
    city: varchar("city").notNull(),
    state: varchar("state").notNull(),
    zipcode: varchar("zip",{length:10}).notNull(),
    notes: text("notes"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(()=> new Date())
})

export const tickets= pgTable("tickets",{
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().references(()=> customers.id),
    title: varchar("title").notNull(),
    description: text("description"),
    tech: varchar("tech").notNull().default("unassigned"),
    completed: boolean("completed").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(()=> new Date())
})

export const customerRelations= relations(customers, ({many})=>({
    tickets:many(tickets)
}))

export const ticketsRelations= relations(tickets, ({one})=>({
    customers:one(customers,{
        fields:[tickets.customerId],
        references:[customers.id],
    })
}))