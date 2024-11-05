import { createContext, Dispatch, SetStateAction } from 'react'

interface ColorHeaderContext {
  color: string
  setColor: Dispatch<SetStateAction<string>>
}

export const ColorHeaderContext = createContext({} as ColorHeaderContext)
