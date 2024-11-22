'use server'

import { env } from '@/env/index'

export async function getAgentPermissions(agent: string) {
  try {
    const url = new URL(
      `${env.DIALER_IP}:${env.PORT_DIALER}${env.SEARCH_SSO}${agent}`,
    )

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Erro ${res.status}: Não foi possível buscar as permissões.`)
    }

    const json = await res.json()
    return json
  } catch (error) {
    console.error('Erro ao obter permissões do agente:', error)
    return { message: `Não foi possível obter os dados do agente. ${error}` }
  }
}
