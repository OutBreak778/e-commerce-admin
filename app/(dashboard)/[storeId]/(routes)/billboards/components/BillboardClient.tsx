"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/dataTable'
import ApiList from '@/components/ui/ApiList'

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient: React.FC<BillboardClientProps> = ({data}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <div>
        <div className='flex items-center justify-between mb-4'>
        <Heading title={`Billboards (${data.length})`} description='Manage your billboard of your Store' />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Billboard
        </Button>
    </div>
    <Separator />
    <DataTable searchKey='label' columns={columns} data={data} />
    <Separator />
    <Heading title='API' description='API call for Billboards' />
    <ApiList entityName='billboards' entityIdName="billboardId" />
    </div>
  )
}

export default BillboardClient