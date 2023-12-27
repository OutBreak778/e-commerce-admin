"use client"

import UseStoreModal from '@/hooks/useStoreModal'
import { useEffect } from 'react'

const SetUpPage = () => {

  const isOpen = UseStoreModal((state) => state.isOpen)
  const onOpen = UseStoreModal((state) => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  
  return null
}

export default SetUpPage
