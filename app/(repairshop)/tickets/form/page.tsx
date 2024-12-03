import BackButton from "@/components/backButton";
import getCustomer from "@/lib/hooks/getCustomer";
import getTicket from "@/lib/hooks/getTickets";
import TicketForm from "./ticketPageForm";

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
        else{
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
                return <TicketForm customer={customer}/>
            }
        }
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
            return <TicketForm customer={customer} ticket={ticket}/>
        }
    }
    catch(e)
    {
        if(e instanceof Error)
            throw e;
    }
}