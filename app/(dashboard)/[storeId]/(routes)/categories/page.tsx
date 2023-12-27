import React from 'react'
import CategoryClient from './components/CategoryClient'
import prismadb from '@/lib/prismadb'
import { CategoryColumn } from './components/Columns'
import { format } from "date-fns"

const CategoriesPage = async ({params} : {params: {storeId: string}}) => {
    const category = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedCategories: CategoryColumn[] = category.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-6 p-8 pt-6">
            <CategoryClient data={formattedCategories} />
        </div>
    </div>
  )
}

export default CategoriesPage