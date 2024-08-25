'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/Loading'
import {useEffect } from 'react'
import { RectFcChildren } from '@/types'
import { useDispatch } from 'react-redux'

const AppLayout: React.FC<RectFcChildren> = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    console.log(user)
    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-56">
            <Navigation user={user.user} />

            <main>{children}</main>
        </div>
    )
}

export default AppLayout
