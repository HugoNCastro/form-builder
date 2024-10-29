'use server'

import { env } from '@/env/index'

export async function listCampaignsAction() {
  try {
    const url = new URL(
      `${env.DIALER_IP}:${env.PORT_DIALER}${env.PATH_LIST_CAMPAINGS}`,
    )

    const res = await fetch(url)
    const json = await res.json()

    return json
  } catch (error) {
    return { message: 'Não foi possível obter as campanhas' + error }
  }
}

export async function listMailingsAssociateToCampaign(campaignId: string) {
  try {
    const url = new URL(
      `${env.DIALER_IP}:${env.PORT_DIALER}${env.SEARCH_MAILING}${campaignId}`,
    )

    const res = await fetch(url)
    const json = await res.json()

    return json
  } catch (error) {
    return { message: 'Não foi possível buscar os mailing' + error }
  }
}

export async function listParamFields(mailingFileId: string) {
  try {
    const url = new URL(
      `${env.DIALER_IP}:${env.PORT_DIALER}${env.PARAMS_MAILING}${mailingFileId}`,
    )

    const res = await fetch(url)
    const json = await res.json()

    return json
  } catch (error) {
    return { message: 'Não foi possível buscar os parâmetros' + error }
  }
}
