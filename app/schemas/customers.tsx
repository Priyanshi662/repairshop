import {createInsertSchema, createSelectSchema} from "drizzle-zod"
import { customers } from "../drizzle/schema"
import { INDIAN_STATES } from "@/constants/states";

   
  export const customerInsertSchema = createInsertSchema(customers, {
    firstname: (schema) => schema.firstname
      .min(1, "First Name cannot be empty"),
      
    lastname: (schema) => schema.lastname
      .min(2, "Last name cannot be empty"),
      
    email: (schema) => schema.email
      .email("Enter a valid email"),
      
    phone: (schema) => schema.phone
      .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
      
    address1: (schema) => schema.address1
      .min(5, "Too short"),
      
    zipcode: (schema) => schema.zipcode
      .regex(/^[1-9][0-9]{5}$/, "Invalid Pin Code"),
      
    state: (schema) => schema.state.refine((val) => INDIAN_STATES.map((item)=>(val===item.description)), "Invalid state")
  });

export const customerSelectSchema=createSelectSchema(customers);

export type customerSelectType= typeof customerSelectSchema._type;
export type customerInsertType= typeof customerInsertSchema._type;
