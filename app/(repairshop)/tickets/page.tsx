import getTicketBySearch from "@/lib/queries/getTicketsBySearch";
import TicketSearch from "./ticketSearchPage";
import getOpenTickets from "@/lib/queries/getOpenTickets";

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
                <p> {JSON.stringify(openTickets)}</p>
            </>
        )
    }
    const tickets= await getTicketBySearch(searchText);
    return(
        <div>
            <TicketSearch/>
            {JSON.stringify(tickets)}
        </div>
    )
}