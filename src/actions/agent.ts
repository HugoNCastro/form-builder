'use server'

import { env } from '@/env/index'

export async function getAgentPermissions(agent: string) {
  try {
    const url = new URL(
      `${env.DIALER_IP}:${env.PORT_DIALER}${env.SEARCH_SSO}${agent}`,
    )

    const res = await fetch(url)
    const json = await res.json()

    return json
  } catch (error) {
    return { message: 'Não foi possível obter os dados do agente.' + error }
  }
}
