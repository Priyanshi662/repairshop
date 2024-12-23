import { File, Home, LogOut, UsersRound } from "lucide-react";
import { NavButton } from "@/components/NavButton";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import NavbuttonMenu from "./NavButtonMenu";
export default function Header()
{
    return(
        <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
            <div className="flex justify-between w-full h-8 items-center">
                <div className="flex gap-2 font-semibold p-2 items-center">
                    <NavButton href="/home" label="home" icon={Home}/>
                    <Link href="/home" title="home">
                        <h2 className="hidden sm:block ">Computer Repair Shop</h2>
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <NavButton href="/tickets" label="tickets" icon={File}/>
                    {/* <NavbuttonMenu
                        icon={File}
                        label="Tickets"
                        choices={[
                            {
                                title:"New Ticket",
                                href:"/tickets/form"
                            },
                            {
                                title:"Search Tickets",
                                href:"/tickets"
                            },
                        ]}
                    /> */}
                    <NavbuttonMenu
                        icon={UsersRound}
                        label="customers"
                        choices={[
                            {
                                title:"New customer",
                                href:"/customers/form"
                            },
                            {
                                title:"Search customer",
                                href:"/customers"
                            },
                        ]}
                    />
                    {/* <NavButton href="/" label="landing page"  icon={LogOut}/> */}
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="rounded-full"
                    >
                        <LogoutLink>
                            <LogOut/>
                        </LogoutLink>
                    </Button>
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
}