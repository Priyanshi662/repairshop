"use client"
import { TicketSearchResultsType } from "@/lib/queries/getTicketsBySearch"
import { Table, 
    TableBody,
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow } from "@/components/ui/table"
import { createColumnHelper, 
    flexRender, 
    getCoreRowModel, 
    useReactTable } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { CircleCheckIcon,
    CircleXIcon } from "lucide-react"

type Props={
    data: TicketSearchResultsType
}

type RowType= TicketSearchResultsType[0]

export default function TicketTable({data}:Props)
{
    const router= useRouter();
    const columnHeadersArray: Array<keyof RowType>=[
        "ticketCreated",
        "title",
        "tech",
        "firstName",
        "lastName",
        "email",
        "completed"
    ]
    const columnHelper= createColumnHelper<RowType>()
    const columns=columnHeadersArray.map((columnName)=>{
        return columnHelper.accessor((row)=>{
            const value= row [columnName]
            if(columnName === "ticketCreated" && value instanceof Date)
            {
                return value.toLocaleDateString('en-US',{
                    year:'numeric',
                    month:'2-digit',
                    day:'2-digit',
                })
            }
            if(columnName === "completed")
            {
                return value?
                "COMPLETED":
                "OPEN"
            }
        },
          {  
            id : columnName,
            header: columnName[0].toUpperCase()+columnName.slice(1),
            cell: ({getValue}) => {
                // presentation
                const value=getValue()
                if(columnName==="completed")
                {
                    return (
                        <div className="grid place-content-center">
                            { value==="OPEN" ?
                            <CircleXIcon className="opacity-25"/> 
                                :
                            <CircleCheckIcon className=" text-green-300"/>
                        }
                        </div>
                    )
                }
                return value
            }
            }
        )
    })
    const table= useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })  


    return (
        <div className="mt-6 rounded-lg border border-border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup)=>(
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header)=>(
                                <TableHead key={header.id} className="bg-secondary"> 
                                    <div>
                                        {header.isPlaceholder ?
                                         null : 
                                         flexRender(header.column.columnDef.header
                                         ,header.getContext())
                                        }
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows.map((row)=>(
                            <TableRow key={row.id}
                                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                                onClick={() => router.push(`/tickets/form?ticketId=${row.original.id}`)}
                            >
                                {
                                    row.getVisibleCells().map((cell)=>(
                                        <TableCell key={cell.id} className="border">
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}