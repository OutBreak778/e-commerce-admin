import React from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden pr-4 '>
            <Menu className='absolute right-20 top-5' />
        </SheetTrigger>
        <SheetContent side="right" className='p-0 bg-secondary pt-10 w-32'>
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar