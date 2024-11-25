import BackButton from "@/components/backButton";
import getCustomer from "@/lib/hooks/getCustomer";

export default async function Form(
    {searchParams}:
    {searchParams : 
        Promise< {[key:string] : string |undefined }>
    })
{
    const {customerId} = await searchParams;
    if(customerId)
    {    
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
        console.log(customer);
    }
    else
    {

    }
}