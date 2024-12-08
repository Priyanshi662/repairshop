
type Props={
    result: {
       data?:{
        message?:string,
        serverError?:string,
        validationErrors?: Record<string,string>[] | undefined
       },
    },
}
const MessageBox=({
    type,
    content
}:{
    type:'success' | 'error',
    content:React.ReactNode
})=>
(
    <div >
        {type==='success'? 'Successfully added 🎉':'Error! 🛑'}
    </div>
)

export function DisplayServerActionResponse({result}:Props)
{
    const {data}=result;
    return (
        <div>
            {data?.message && 
                <MessageBox type="success" content={`Success ${data?.message}`}/>
            }
            {data?.serverError && 
                <MessageBox type="error" content={`Error ${data?.serverError}`}/>
            }
            {
                data?.validationErrors && 
                <MessageBox type="error" 
                content={Object.keys(data?.validationErrors).map(key => (
                        <p key={key}>
                            {`${key} : ${data?.validationErrors![key as keyof typeof data.validationErrors]} `}
                        </p>
                    ))}/>
            }
        </div>
    )
}