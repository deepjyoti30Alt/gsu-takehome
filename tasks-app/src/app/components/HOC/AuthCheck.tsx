'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppSelector } from '@/app/lib/hooks'
import { selectIsLoggedIn } from '@/app/lib/features/authDataSlice'

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn && pathname !== '/authenticate') {
      router.push('/authenticate')
    } else {
      setIsLoading(false)
    }
  }, [isLoggedIn, router, pathname])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}