'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks'
import { selectBasicAuthCredentials, selectIsLoggedIn } from '@/app/lib/features/authDataSlice'
import { fetchTasks } from '@/app/lib/features/tasksSlice'
import { fetchUser } from '@/app/lib/features/userSlice'

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const authCredentials = useAppSelector(selectBasicAuthCredentials)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/authenticate') {
      router.push('/authenticate')
    } else {
      setIsLoading(false)
    }
  }, [isLoggedIn, router, pathname])

  useEffect(() => {
    if (authCredentials) {
      dispatch(fetchTasks(authCredentials))
      dispatch(fetchUser(authCredentials))
    }
  }, [dispatch, authCredentials])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}