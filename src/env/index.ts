import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    DIALER_IP: z.string().url(),
    PORT_DIALER: z.coerce.number().default(8085),
    PATH_LIST_CAMPAINGS: z.string(),
    DATABASE_URL: z.string().url(),
    SEARCH_SSO: z.string(),
    CALL_INFO: z.string(),
    SEARCH_MAILING: z.string(),
    PARAMS_MAILING: z.string(),
    IP_HOST: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_PORT: z.string(),
    POSTGRES_DB_NAME: z.string(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_CLIENT_NAME: z.string(),
    NEXT_PUBLIC_LOGO_PATH: z.string()
  },
  runtimeEnv: {
    DIALER_IP: process.env.DIALER_IP,
    PORT_DIALER: process.env.PORT_DIALER,
    PATH_LIST_CAMPAINGS: process.env.PATH_LIST_CAMPAINGS,
    DATABASE_URL: process.env.DATABASE_URL,
    SEARCH_SSO: process.env.SEARCH_SSO,
    CALL_INFO: process.env.CALL_INFO,
    SEARCH_MAILING: process.env.SEARCH_MAILING,
    PARAMS_MAILING: process.env.PARAMS_MAILING,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    IP_HOST: process.env.IP_HOST,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB_NAME: process.env.POSTGRES_DB_NAME,
    NEXT_PUBLIC_CLIENT_NAME: process.env.NEXT_PUBLIC_CLIENT_NAME,
    NEXT_PUBLIC_LOGO_PATH: process.env.NEXT_PUBLIC_LOGO_PATH
  },
  emptyStringAsUndefined: true,
})