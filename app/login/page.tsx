import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Login(){
    return(
        <main className="h-dvh flex flex-col p-4 items-center gap-6 text-4xl">
            <div>
                <h1>Repair shop</h1>
                <Button asChild>
                    <LoginLink>Sign Up</LoginLink>
                </Button>
            </div>
        </main>
    )
}