import { FormEvent, useCallback, useContext, useState } from "react"
import Layout from "../../components/layout"
// import { AuthContext } from "../context/AuthContext"
import { useRouter } from 'next/router'
import { createProduct } from "../../functions/create-product"



const Create = () => {
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')

    const Router = useRouter()

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()
        await createProduct({ name, description })
        Router.push("/products")
    }, [name, description])

    return (
        <Layout>
            <form onSubmit={handleSubmit} className='container-form'>
                <h2 className="text-4xl mt-5">Criar Produto</h2>
                <div className="container-input">
                    <label htmlFor="">Nome do Produto</label>
                    <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} className="inputs"/>
                </div>
                <div className="container-input">
                    <label htmlFor="">Descrição do produto</label>
                    <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} className="inputs"/>
                </div>

                <div className="container-submit">
                    <button type="submit" className="text-white p-4 bg-gray-700">Criar Produto</button>
                </div>
            </form>
        </Layout>
    )
}

export default Create