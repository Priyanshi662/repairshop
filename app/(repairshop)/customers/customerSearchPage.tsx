import SearchButton from "@/components/searchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";
export default function CustomerSearch()
{   
    return (
        <>
        <Form
            action={"/customers"}
            className="flex gap-2 items-center m-4"
        >
            {/* action will send the data to /customers endpoint and add the query as ?searchText="..." */}
            <Input
                name="searchText"
                type="text"
                placeholder="Search Customers"
                className="w-full "
            />
            <SearchButton/>
        </Form>
        </>
    )
}