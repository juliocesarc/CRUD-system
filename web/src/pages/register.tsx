import React, { FormEvent, useCallback, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from 'next/link'
import Layout from "../components/layout";
import { createAcount } from "../functions/create-acount";



const Register: React.FC = () => {
    const { signIn } = useContext(AuthContext)
    const [input, setInput] = useState({
        username: '',
        name: '',
        password: '',
        confpassword: ''
    })
    const [error, setError] = useState({
        username: '',
        password: '',
        confpassword: ''
    })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
        validateInput(e)
    }
    
    const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        let errorExists = false
        setError(prev => {
        const stateObj = { ...prev, [name]: "" };
 
        switch (name) {
        case "username":
            if (!value) {
            stateObj[name] = "Por favor coloque o Username.";
            errorExists = true
            }
            break;

        case "password":
            if (!value) {
            stateObj[name] = "Por favor coloque uma senha";
            errorExists = true
            } else if (input.confpassword && value !== input.confpassword) {
            stateObj["confpassword"] = "Sua senha e sua confirmação de senha não batem";
            errorExists = true
            } else {
            stateObj["confpassword"] = input.confpassword ? "" : error.confpassword;
            }
            break;
    
        case "confpassword":
            if (!value) {
            stateObj[name] = "Por favor confime sua senha";
            errorExists = true
            } else if (input.password && value !== input.password) {
            stateObj[name] = "Sua senha e sua confirmação de senha não batem";
            errorExists = true
            }
            break;
    
        default:
            break;
        }
        
        return stateObj;
    });
    }
    
    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()
        if (error.confpassword != '') {
            window.alert(error.confpassword)
            return
        } else if (error.password != '') {
            window.alert(error.password)
            return
        } else if (error.username != '') {
            window.alert(error.username)
            return
        }
        const response = await createAcount(input)

        if (response.status == 400) {
            window.alert(response.data)
            return
        }
        signIn(input)
    }, [input])
    

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="container-form">
                <h2 className="text-4xl mt-5">Criar conta</h2>
                <div className="container-input">
                    <label htmlFor="">Username</label>
                    <input type="text" 
                    name="username"
                    value={input.username} onChange={onInputChange} 
                    onBlur={validateInput}
                    className="inputs"/>
                    {error.username && <span className='text-red-600'>{error.username}</span>}
                </div>
                <div className="container-input">
                    <label htmlFor="">Nome</label>
                    <input type="text" 
                    name="name"
                    value={input.name} onChange={onInputChange}
                    className="inputs"/>
                </div>
                <div className="container-input">
                    <label htmlFor="">Senha</label>
                    <input type="password"
                    name="password"
                    value={input.password} onChange={onInputChange}
                    onBlur={validateInput} 
                    className="inputs"/>
                    {error.password && <span className='text-red-600'>{error.password}</span>}
                </div>
                <div className="container-input">
                    <label htmlFor="">Confirme sua senha</label>
                    <input type="password"
                    name="confpassword"
                    value={input.confpassword} onChange={onInputChange}
                    onBlur={validateInput} 
                    className="inputs"/>
                    {error.confpassword && <span className='text-red-600'>{error.confpassword}</span>}
                </div>
                <p className="text-center text-gray-400 mb-1">Já possui um cadastro? <Link href={'/login'} className="text-blue-500">Entrar</Link></p>
                <div className="container-submit">
                    <button type="submit" className="submit-button"> Entrar </button>
                </div>
            </form>
        </Layout>
    )
}


export default Register
