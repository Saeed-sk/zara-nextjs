'use client'
import React from 'react';
import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/Loading'
import { RectFcChildren } from '@/types'

const AppLayout: React.FC<RectFcChildren> = ({ children }) => {
    const { userData } = useAuth({ middleware: 'auth' })
    console.log(userData)
    if (!userData) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-56">
            <Navigation user={userData.user} />
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
