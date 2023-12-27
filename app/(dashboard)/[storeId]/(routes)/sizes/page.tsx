import React from 'react'
import BillboardClient from './components/SizeClient'
import prismadb from '@/lib/prismadb'
import { SizesColumn } from './components/Columns'
import { format } from "date-fns"

const SizesPage = async ({params} : {params: {storeId: string}}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedSizes: SizesColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-6 p-8 pt-6">
            <BillboardClient data={formattedSizes} />
        </div>
    </div>
  )
}

export default SizesPage