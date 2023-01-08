import React, { FormEvent, useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from 'next/link'
import Layout from "../components/layout";
import { signIn } from "next-auth/react"


const LogIn: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useAuth()

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()
        await signIn({ username, password })
    }, [username, password])
    

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="container-form">
                <h2 className="text-4xl mt-5">Login</h2>
                <div className="container-input">
                    <label htmlFor="">Usuário</label>
                    <input type="text" placeholder="johndown" onChange={(e) => setUsername(e.target.value)} 
                    className="inputs"/>
                </div>
                <div className="container-input">
                    <label htmlFor="">Senha</label>
                    <input type="password" placeholder="******" onChange={(e) => setPassword(e.target.value)} 
                    className="inputs"/>
                    <p className="text-center text-gray-400">Ainda não possui um cadastro? <Link href={'/register'} className="text-blue-500">Criar :D</Link></p>
                </div>
                <div className="container-submit">
                    <button type="submit" className="submit-button"> Entrar </button>
                </div>
            </form>
        </Layout>
    )
}

export default LogIn
