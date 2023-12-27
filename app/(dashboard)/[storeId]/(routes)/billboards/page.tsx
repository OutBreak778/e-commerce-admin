import React from 'react'
import BillboardClient from './components/BillboardClient'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/Columns'
import { format } from "date-fns"

const BillboardsPage = async ({params} : {params: {storeId: string}}) => {
    const billboard = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedBillboard: BillboardColumn[] = billboard.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-6 p-8 pt-6">
            <BillboardClient data={formattedBillboard} />
        </div>
    </div>
  )
}

export default BillboardsPage