import getTicketBySearch from "@/lib/queries/getTicketsBySearch";
import TicketSearch from "./ticketSearchPage";
import getOpenTickets from "@/lib/queries/getOpenTickets";
import TicketTable from "./ticketTable";

export const metadata={
    title:"Ticket Search"
}
export default async function Tickets(
    {searchParams}:{searchParams:{[key:string]:string}}
){
    const {searchText}= await searchParams;

    if(!searchText)
    {
        const openTickets= await getOpenTickets();
        return(
            <>
                <TicketSearch/>
                { 
                    openTickets.length?
                    <TicketTable data={openTickets}/>
                    :
                    null
                }
            </>
        )
    }
    const tickets= await getTicketBySearch(searchText);
    return(
        <div>
            <TicketSearch/>
            <TicketTable data={tickets}/>
        </div>
    )
}