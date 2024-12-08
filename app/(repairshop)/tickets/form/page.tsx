import BackButton from "@/components/backButton";
import getCustomer from "@/lib/hooks/getCustomer";
import getTicket from "@/lib/hooks/getTickets";
import TicketForm from "./ticketPageForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {Users,init as KindeInit} from "@kinde/management-api-js";

export async function generateMetadata(
    {searchParams}:{
        searchParams:
            Promise<{[key:string]:string|undefined}>
    }
){
    const {customerId,ticketId}=await searchParams;
    
    if(!customerId && !ticketId)
        return {title:"Missing Ticket ID or customer ID"}

    if(customerId)
        return {title:`Create New Ticket for user${customerId}`}

    if(ticketId)
        return {title:`Edit Ticket ${ticketId}`}

}
export default async function Form(
    {searchParams}:
    {searchParams : 
        Promise< {[key:string] : string |undefined }>
    })
{
    try{
        const {customerId, ticketId}= await searchParams;
        if(!customerId && !ticketId)
        {
            return(
                <div className="flex flex-col items-center justify-center mt-20">
                <h2 className=" mb-10 text-2xl">
                    Customer Id or ticket Id required for ticket
                </h2>
                <BackButton
                    title="Go Back"
                    variant="default"
                    className="p-4 h-4 w-20"
                />
                </div>
            )
        }
        // New ticket
        else{
            const {getPermission, getUser}= getKindeServerSession();
            const [managerPermission,user]=await Promise.all(
               [ 
                getPermission('manager'),
                getUser()
            ]);
            const isManager=managerPermission?.isGranted;

            if(customerId)
            {
                const customer= await getCustomer(parseInt(customerId));
                if(!customer){
                    return(
                        <div>
                            <h2>
                                Customer ID # ${customerId} not Found
                            </h2>
                            <BackButton 
                            title="Go Back" 
                            variant="default"
                            className="p-4 h-4 w-20"
                            />
                        </div>
                    )
                }
                if(!customer.active)
                {   
                    return(
                        <div className="flex flex-col items-center justify-center mt-20">
                        <h2 className=" mb-10 text-2xl">
                            Customer Id #{customerId} is not active
                        </h2>
                        <BackButton
                            title="Go Back"
                            variant="default"
                            className="p-4 h-4 w-20"
                        />
                        </div>
                    )
                }
                if(isManager)
                {
                    KindeInit();
                    const {users}= await Users.getUsers();
                    const techs= users? users.map((user)=>({id:user.email!, description:user.email!})):[];
                    return <TicketForm customer={customer} techs={techs}/>
                }
                else
                {
                    return <TicketForm customer={customer}/>
                }
            }
        
        // Edit ticket
        if(ticketId)
        {
            const ticket = await getTicket(parseInt(ticketId));
            if(!ticket)
            {
                return(
                    <div className="flex flex-col items-center justify-center mt-20">
                    <h2 className=" mb-10 text-2xl">
                        Ticket Id #{customerId} not found
                    </h2>
                    <BackButton
                        title="Go Back"
                        variant="default"
                        className="p-4 h-4 w-20"
                    />
                    </div>
                )
            }
                const customer= await getCustomer(ticket.customerId);
                if(isManager)
                {
                    KindeInit();
                    const {users}= await Users.getUsers();
                    const techs= users? users.map((user)=>({id:user.email! , description:user.email!})) : [];
                    return <TicketForm customer={customer} ticket={ticket} techs={techs}/>
                }
                else{
                    const isEditable = (user.email?.toLowerCase() === ticket.tech.toLowerCase());
                    return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable}/>
                }
            }
        }
    }
    catch(e)
    {
        if(e instanceof Error)
            throw e;
    }
}