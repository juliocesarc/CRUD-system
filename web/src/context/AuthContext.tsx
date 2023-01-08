import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Router from "next/router";
import api from "../services/api";
import { getUser } from "../functions/get-user-permissions";
import { Loading } from "../components/Loading-page";
import LogIn from "../pages/login";
import { checkIsPublicRoute } from "../functions/check-is-public-route";


type User = {
    id: string;
    name: string;
    username: string;
    role: string;
    exp?: number;
    iat?: number;
    sub?: string;
}

type SignInData = { 
    username: string; 
    password: string; 
}

type AuthContextType = { 
    isAuthenticated: boolean;
    user: User | undefined;
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => void;
    loading: boolean;
}

interface AuthProviderProps { 
    children: React.ReactNode,
}

export const AuthContext = createContext({} as AuthContextType)


function AuthProvider({children}: AuthProviderProps) {
    
    const [user, setUser] = useState<User | undefined>()
    const [ loading, setLoading ] = useState(true)
    
    useEffect(() => {
        const { "permissionToken": token } = parseCookies()

        if(token) {
            getUser(token).then(response => { setUser(response.data) })
        }
        setLoading(false)
    }, [])


    const signIn = useCallback(async ({username, password}: SignInData) => {
        const response = await api.post('/sessions', { username, password })
        const { token, user } = response.data

        setCookie(undefined, "permissionToken", token, {
            maxAge: 1 * 60 * 60, //1h
            path: "/"
        })

        setUser(user)
        Router.push("/products")
    }, [])

    const signOut = useCallback(() => {
        destroyCookie(undefined, "permissionToken", {
            path: '/'
        })
        Router.push("/")
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut, loading}}>
           {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    return context;
}

const ProtectRoute = ({ children }: AuthProviderProps): JSX.Element => {
    const { isAuthenticated, loading } = useAuth();
    
    return (
        <>
        { loading && <Loading /> }
        { (!loading && (!isAuthenticated && !checkIsPublicRoute(window.location.pathname))) && <LogIn/> }
        { !loading && children }
        </>
    )
};

export { AuthProvider, useAuth, ProtectRoute }
