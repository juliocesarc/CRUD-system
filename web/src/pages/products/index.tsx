import api from '../../services/api'
import Link from 'next/link'
import { IoAdd } from "react-icons/io5";
import { PrivateComponent } from '../../components/PrivateComponent';
import { GetStaticProps } from 'next'
import { AuthContext, AuthProvider, useAuth } from '../../context/AuthContext';
import { useContext } from 'react';



interface ProductProps {
    arrayProducts: Array<Product>
}

interface Product {
    name: string
    description: string
    createdAt: Date
    id: string
}


const Products = (props: ProductProps) => {
    const { user, signOut } = useAuth()

    return (
        <div>
            <div className="mb-3 bg-slate-500 flex justify-between text-white">
                <h1 className="my-2 mx-4">{`Olá ${user?.name}! Você é ${user?.role} e seu username é ${user?.username}`}</h1>
                <button onClick={signOut} className="m-2 mx-4 border border-white px-2 py-1 rounded-md"> Sair </button>
            </div>
            <PrivateComponent role={["GERENTE"]}>
            <Link href={'products/create'}>
                <div className='border border-blue-600 rounded-md m-2 py-2 px-3 flex justify-center'>
                    <h2 className='flex text-gray-600'><IoAdd className='text-blue-600 text-2xl mr-3'/> Adicionar Produto</h2>
                </div>
            </Link>
            </PrivateComponent>
            <div>
                {props.arrayProducts.map(product => {
                    return (
                    <Link href={`products/${product.id}`}  key={product.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                        <span className="font-normal text-gray-600 dark:text-gray-400 mt-2">{String(product.createdAt)}</span>
                    </Link>
                    )
                })}
            </div>
        </div>
    )
    return <div>Carregando</div>
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await api.get('/products')
    
    return {
        props: {
            arrayProducts: response.data
        },
        revalidate: 60,
    }
}

export default Products