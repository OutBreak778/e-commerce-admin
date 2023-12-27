import React from 'react'
import prismadb from '@/lib/prismadb'
import { ProductsColumn } from './components/Columns'
import { format } from "date-fns"
import { formatter } from '@/lib/utils'
import ProductsClient from './components/ProductsClient'

const ProductPage = async ({params} : {params: {storeId: string}}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            size: true,
            color: true
        },  
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedProducts: ProductsColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
      }));

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-6 p-8 pt-6">
            <ProductsClient data={formattedProducts} />
        </div>
    </div>
  )
}

export default ProductPage