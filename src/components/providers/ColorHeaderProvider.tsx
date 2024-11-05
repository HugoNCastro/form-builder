'use client'

import { ColorHeaderContext } from '@/components/context/ColorHeaderContext'
import { ReactNode, useState } from 'react'

export function ColorHeaderProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState('')

  return (
    <ColorHeaderContext.Provider value={{ color, setColor }}>
      {children}
    </ColorHeaderContext.Provider>
  )
}
