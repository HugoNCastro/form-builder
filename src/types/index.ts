export type CampaignProps = {
    cd_campanha: number
    ds_campanha: string
    cd_tipo_campanha: number
    ds_tipo_campanha: string
    nu_max_chamada_simultanea: number
    nu_tentativa: null
    cd_servico: number
    sg_cifra: string
    nu_agressividade: string
    nu_pos_atendimento: number
    nu_media_atendimento: number
    nu_periodo_estatistica: number
    nu_relacao_progressivo: number
    in_estatistica_hitrate: number
    cd_atividade_campanha: number
    ls_cifra_monitoracao: '{}'
    ds_ura: null
    ds_ura_audio: null
    cd_exit_route: string
    sg_cifra_mcdu: null
    in_direcionamento_ura_grafica: null
    nu_agente: number
    nu_agente_ocupado: number
    nu_chamada_necessaria: number
  }
  
  export type MailingProps = {
    cd_campanha_arquivo: number
    cd_campanha: string
    ds_campanha_arquivo: string
  }

  export type AttemptData = {
        cd_agente: number,
        ds_campanha_arquivo: string,
        ds_campanha: string,
        js_segmentacao: string,
        nu_telefone: string,
        sg_cifra: string,
        cd_mailing: number,
        cd_campanha: number,
        id_contato_crm: unknown,
        cd_telefone_complementar: number,
        cd_servico: number,
        cd_tentativa_mailing: number,
        nu_ddd: string 
  }