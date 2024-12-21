import getCustomersBySearch from "@/lib/queries/getCustomersBySearch";
import CustomerSearch from "./customerSearchPage";

export const metadata={
    title:"Customer Search"
}
export default async function Customers(
    {searchParams}:
    {searchParams: {[key:string]:string}}
){
    const {searchText}= await searchParams;
    if(!searchText)
        return <CustomerSearch/>
    const searchResults= await getCustomersBySearch(searchText);
    return(
        <div>
            <CustomerSearch/>
            <p>
                {JSON.stringify(searchResults)}
            </p>
        </div>
    )
}