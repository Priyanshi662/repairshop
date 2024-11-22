import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type props={
    icon:LucideIcon;
    label:string;
    href:string|null;
}
export function NavButton({
    icon:Icon,
    label,
    href
}:props){
    return(
            <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            aria-label={label} 
            title={label}
            asChild
            >
                {href?
                    (
                        <Link href={href}>
                            <Icon/>
                        </Link>
                    ):(
                        <Icon/>
                    )
                }    
            </Button>
    )
}