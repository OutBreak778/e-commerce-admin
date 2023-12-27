"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductsColumn, columns } from './Columns'
import { DataTable } from '@/components/ui/dataTable'
import ApiList from '@/components/ui/ApiList'

interface ProductsClientProps {
    data: ProductsColumn[]
}

const ProductsClient: React.FC<ProductsClientProps> = ({data}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <div>
        <div className='flex items-center justify-between mb-4'>
        <Heading title={`Products (${data.length})`} description='Manage your Products of your Store' />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Product
        </Button>
    </div>
    <Separator />
    <DataTable searchKey='name' columns={columns} data={data} />
    <Separator />
    <Heading title='API' description='API call for Product' />
    <ApiList entityName='products' entityIdName="productsId" />
    </div>
  )
}

export default ProductsClient