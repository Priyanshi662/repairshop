import BackButton from "@/components/backButton";
import getCustomer from "@/lib/hooks/getCustomer";
import CustomerFormPage from "./customerPageform";

export async function generateMetadata(
    {searchParams}:
    {
        searchParams:
        Promise< {[key:string] :string|undefined}>
    })
{
    const {customerId}=await searchParams;
    if(!customerId) return {title:"New Customer"}
    return {title:`Edit Customer #${customerId}`}
}
export default async function Customer(
    {searchParams}:
    {searchParams : 
        Promise< {[key:string] : string |undefined }>
    })
{
    try{
    const {customerId} = await searchParams;
    if(customerId)
    {    // Edit form
        const customer = await getCustomer(parseInt(customerId));
        if(!customer)
        {
            return(
                <div className="flex flex-col items-center justify-center mt-20">
                <h2 className=" mb-10 text-2xl">
                    Customer Id #{customerId} not found
                </h2>
                <BackButton
                    title="Go Back"
                    variant="default"
                    className="p-4 h-4 w-20"
                />
                </div>
            )
        }
        else
        {
           return <CustomerFormPage customer={customer}/>
        }
    }
    else
    {
        // new customer:
       return <CustomerFormPage/>
    }
}
catch(error)
{
    console.log(error);
}   
}