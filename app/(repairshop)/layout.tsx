import Header from "@/components/Header"

export default async function layout({children}:
    {children:React.ReactNode}
){
    return(
        <div className="animate-slide">
            <Header/>
            <div>
                {children}
            </div>
        </div>
    )
}