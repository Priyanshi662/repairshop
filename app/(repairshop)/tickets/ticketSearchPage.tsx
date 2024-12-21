import SearchButton from "@/components/searchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export default function TicketSearch(){
    return (
        <>
            <Form
            action="/tickets"
            className="flex items-center"
            >
                <Input
                    name="searchText"
                    type="text"
                    placeholder="Search ticket"
                    className="w-full"
                />
            <SearchButton/>
            </Form>
        </>

    )
}