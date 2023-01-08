import { JWT } from "next-auth/jwt/types"
import { decode } from "next-auth/jwt"
import { ReactNode, useContext, useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import api from "../../services/api"


interface PrivateComponentProps {
    role: string[]
    children: ReactNode
}


export const PrivateComponent = ({role, children}: PrivateComponentProps) => {
    const { user } = useAuth()

    const [ permission, setPermission ] = useState(false)

    useEffect(() => {
        if (user?.role === undefined) return
        const contaisRole = role.includes(user?.role)
        setPermission(contaisRole)
    }, [])


    return (
        <>
            {!permission && null}
            {permission && children}
        </>
    )
}