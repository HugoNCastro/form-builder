import { AgentItem } from '@/types'
import { createContext } from 'react'

interface AgentContextType {
  agent: AgentItem[]
  setAgentData: (agentIdentifier: string) => Promise<void>
  loading: boolean
  error: string | null
}

export const AgentContext = createContext({} as AgentContextType)