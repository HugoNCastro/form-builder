'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAgentPermissions } from '@/actions/agent'
import { useAgent } from '@/components/providers/AgentProvider'
import { Button } from '@/components/ui/button'
import { LoaderCircle, UserRound, UserRoundX } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { AgentItem } from '@/types'

export function AuthCard() {
  const [loading, setLoading] = useState(true)
  const [localStorageAgent, setLocalStorageAgent] = useState<string | null>(null)
  const agentParam = useSearchParams().get('agent')

  const { agent, setAgent } = useAgent()
  const router = useRouter()

  useEffect(() => {
    const storedAgent = window.localStorage.getItem('@surveys/agent')
    setLocalStorageAgent(storedAgent)

    if (agentParam) {
      getAgentPermissions(agentParam).then((agentPermissions: Array<AgentItem>) => {
        setAgent(agentPermissions)
        if (agentPermissions.length > 0) {
          window.localStorage.setItem('@surveys/agent', String(agentPermissions[0].cd_agente))
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [agentParam, setAgent])

  async function handleRedirectByPermissions() {
    if (agent) {
      const verifyPermissions = agent.filter((agent) => agent.nm_action === 'edit')
      if (verifyPermissions.length > 0) {
        router.push('/dashboard')
      } else {
        router.push(`/history?agent=${agent[0].cd_agente}`)
      }
    }
  }

  const isAgentInvalid = !agent.length || !localStorageAgent

  return (
    <div className="flex min-h-screen items-center justify-center flex-1 w-full">
      <Card className="rounded border-none shadow-xl shadow-slate-900 flex">
        {loading ? (
          <div className="w-96 h-64 flex flex-col flex-1 justify-center items-center">
            <LoaderCircle className="animate-spin" />
            <h1>Carregando dados...</h1>
          </div>
        ) : isAgentInvalid ? ( 
          <CardContent className="w-96 h-64 flex-1 flex flex-col justify-center gap-8 items-center">
            <div className="flex p-6 justify-center items-center rounded-full bg-slate-900/20">
              <UserRoundX size={60} />
            </div>
            <span className="text-center">
              Agente sem permissões ou matrícula inválida, por favor tente
              novamente.
            </span>
          </CardContent>
        ) : (
          <CardContent className="p-5 flex flex-col items-center justify-center gap-3">
            <div className="flex p-6 justify-center items-center rounded-full bg-slate-900/20">
              <UserRound size={60} />
            </div>
            <span className="text-xl font-bold">{agentParam}</span>
            <Separator className="bg-gray-400" />
            <span className="text-xl font-bold">Permissões</span>
            <div className="flex flex-col my-2">
              <div className="flex p-2 gap-2 mb-4 bg-transparent/15 font-semibold justify-around">
                {agent.map((agentData) => (
                  <div key={agentData.nm_action}>
                    <p className="hover:text-sky-400 cursor-default animate-fade-in">
                      {agentData.nm_action === 'list' && 'Visualizar'}
                    </p>
                    <p className="hover:text-sky-400 cursor-default animate-fade-in">
                      {agentData.nm_action === 'edit' && 'Criar e editar'}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="bg-gray-400" />
              <span className="mt-3">
                Para prosseguir clique no botão abaixo.
              </span>
              <span className="mt-3 text-xs text-zinc-400">
                Essa ação será necessária no primeiro acesso ou caso o token
                expire.
              </span>
            </div>
            <Button
              variant="ghost"
              className="bg-emerald-400 hover:bg-emerald-500"
              onClick={handleRedirectByPermissions}
            >
              Prosseguir
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}