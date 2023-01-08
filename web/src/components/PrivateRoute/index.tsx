import { useRouter } from 'next/navigation'
import {  ReactNode, useEffect } from "react"
import { APP_ROUTES } from '../../constants/app-routes'
import { useAuth } from '../../context/AuthContext'


interface PrivateRouteProps {
    children: ReactNode
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth()
    const Router = useRouter()
    

    useEffect(() => {
        if (!isAuthenticated) {
            Router.push(APP_ROUTES.public.login)
            return
        }
    }, [isAuthenticated])

    return (
        <>
            {!isAuthenticated && null}
            {isAuthenticated && children}
        </>
    )
}
