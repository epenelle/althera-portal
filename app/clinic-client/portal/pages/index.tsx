import React from 'react'

import { ButtonContextProvider } from '@/components/Helper/ButtonContext'

import Home from './Home'

const index = () => {
  return (
    <ButtonContextProvider>
        <Home />
    </ButtonContextProvider>
  )
}

export default index;