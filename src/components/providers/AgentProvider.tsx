'use client'

import { AgentContext } from '@/components/context/AgentContext'
import { AgentItem } from '@/types'
import { ReactNode, useContext, useState } from 'react'

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agent, setAgent] = useState<Array<AgentItem>>([])

  return (
    <AgentContext.Provider value={{ agent, setAgent }}>
      {children}
    </AgentContext.Provider>
  )
}

export const useAgent = () => useContext(AgentContext)