import React from 'react'
import ColorClient from './components/ColorClient'
import prismadb from '@/lib/prismadb'
import { ColorColumn } from './components/Columns'
import { format } from "date-fns"

const ColorPage = async ({params} : {params: {storeId: string}}) => {
    const Color = await prismadb.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedColor: ColorColumn[] = Color.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-6 p-8 pt-6">
            <ColorClient data={formattedColor} />
        </div>
    </div>
  )
}

export default ColorPage