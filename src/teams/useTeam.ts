'use client'

import { useQuery } from '@tanstack/react-query'
import { AppwriteException } from 'appwrite'
import { useContext, useMemo } from 'react'
import { isAppwriteError, useAppwrite } from 'react-appwrite-hooks'

export function useTeam(teamId: string) {
  const { teams } = useAppwrite()
  const queryKey = useMemo(() => ['appwrite', 'teams', teamId], [teamId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await teams.get(teamId)
    },
  })

  return queryResult
}