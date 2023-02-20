import { Account, AppwriteException, Avatars, Client, Databases, Functions, Storage, Teams } from 'appwrite'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { DevtoolsOptions } from '@tanstack/react-query-devtools/build/lib/devtools'

export * from './account'
export * from './database'
export * from './functions'
export * from './storage'
export * from './avatars'
export * from './teams'

export type AppwriteContextType = {
  client: Client,
  account: Account,
  database: Databases,
  functions: Functions,
  storage: Storage,
  avatars: Avatars,
  teams: Teams,
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
})

type Props = {
  client: Client,
  children: ReactNode,
  devTools: boolean | DevtoolsOptions,
  queryClient?: QueryClient,
}

export function AppwriteProvider({ client, children, devTools, ...props }: Props) {
  const value = useMemo<AppwriteContextType>(() => ({
    client,
    account: new Account(client),
    database: new Databases(client),
    functions: new Functions(client),
    storage: new Storage(client),
    health: new Storage(client),
    avatars: new Avatars(client),
    teams: new Teams(client),
  }), [])

  return (
    <AppwriteContext.Provider
      value={value}
    >
      <QueryClientProvider
        client={props.queryClient || queryClient}
      >
        {children}

        {
          devTools &&
          <ReactQueryDevtools
            {...(typeof devTools === 'boolean' ? {} : devTools)}
          />
        }
      </QueryClientProvider>
    </AppwriteContext.Provider>
  )
}

// @ts-ignore
export const AppwriteContext = createContext<AppwriteContextType>()
export const useAppwrite = () => useContext(AppwriteContext)

export const isAppwriteError = (error: unknown): error is AppwriteException => {
  return typeof error === 'object' && !!error && (error as any).name === 'AppwriteException'
}