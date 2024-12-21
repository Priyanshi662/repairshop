import { LucideIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { Button } from "./ui/button"


type Props={
    icon: LucideIcon,
    label: string,
    choices:{
        title:string,
        href: string
    }[]
}

export default function NavbuttonMenu({
    icon:Icon,
    label,
    choices
}:Props){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                >
                <Icon
                    className="h-[1.2rem] w-[1.2rem]"
                />
                <span className="sr-only">{label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {choices.map((choice)=>(
                    <DropdownMenuItem key={choice.title} asChild>
                        <Link href={choice.href}>
                            {choice.title}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}