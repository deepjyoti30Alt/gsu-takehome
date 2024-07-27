'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '../../lib/hooks'
import { selectIsLoggedIn } from '../../lib/features/authDataSlice'

export const useAuthCheck = () => {
    const router = useRouter()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/authenticate')
        }
    }, [isLoggedIn, router])

    return isLoggedIn
}
