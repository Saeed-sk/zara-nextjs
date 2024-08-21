import { RectFcChildren } from "@/types"
import React from "react"

const AuthCard: React.FC<RectFcChildren> = ({ children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-50">
        {children}
    </div>
)

export default AuthCard
