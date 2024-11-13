import { AgentItem } from '@/types'
import { createContext, Dispatch, SetStateAction } from 'react'

interface AgentContextType {
  agent: AgentItem[]
  setAgent: Dispatch<SetStateAction<AgentItem[]>>
}

export const AgentContext = createContext({} as AgentContextType)