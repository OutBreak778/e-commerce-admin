import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForm from './components/SizeForm'

const BillboardPage = async ({params}: {params: {sizeId: string}}) => {

    const Size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeForm initialData={Size} />
        </div>
    </div>
  )
}

export default BillboardPage