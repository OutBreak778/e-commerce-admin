import React from 'react'
import prismadb from '@/lib/prismadb'
import { OrdersColumn } from './components/Columns'
import { format } from "date-fns"
import { formatter } from '@/lib/utils'
import OrdersClient from './components/OrdersClient'

const OrdersPage = async ({params} : {params: {storeId: string}}) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedOrders: OrdersColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-6 p-8 pt-6">
            <OrdersClient data={formattedOrders} />
        </div>
    </div>
  )
}

export default OrdersPage