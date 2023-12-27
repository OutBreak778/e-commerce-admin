"use client"

import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { OrdersColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/dataTable'

interface OrdersClientProps {
    data: OrdersColumn[]
}

const OrdersClient: React.FC<OrdersClientProps> = ({data}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <div>
        <div className='flex items-center justify-between mb-4'>
        <Heading title={`Orders (${data.length})`} description='Manage your Order of your Store' />
    </div>
    <Separator />
    <DataTable searchKey='products' columns={columns} data={data} />
    </div>
  )
}

export default OrdersClient