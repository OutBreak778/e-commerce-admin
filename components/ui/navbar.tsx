import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from '@/components/MainNav'
import StoreSwitcher from '@/components/StoreSwitcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ModeToggle } from '../ModeToggle'

const Navbar = async () => {

    const {userId} = auth()
    if(!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findMany({
        where: {
            userId
        }
    })

  return (
    <div className='border-b'>
        <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={store} />
            <MainNav className='mx-6' />
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    </div>
  )
}

export default Navbar