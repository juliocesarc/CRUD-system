import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { PrivateComponent } from '../../components/PrivateComponent'
import api from '../../services/api'


interface Product {
    id: string
    name: string
    description: string
    createdAt: Date
}

const Product: React.FC = () => {
    const router = useRouter()
    const { push } = useRouter()
    const { id } = router.query
    const [product, setProduct] = useState<Product>()


    useEffect(() => {
        async function getProduct() {
            const response = await api.post(`/products/${id}`, id)
            setProduct(response.data)
        }
        getProduct()
    }, [])

    const deleteProduct = useCallback(() => {
        async function excludeProd() {
            await api.post('/products/delete', {id})
            push('/products')
        }
        excludeProd()
    }, [])

    return (
        <Layout>
        <div className='bg-white p-2'>
            <p>{product?.name}</p>
            <p>{product?.description}</p>
            <p>{String(product?.createdAt)}</p>
            <p className='bg-orange-700'>{product?.id}</p>

            <PrivateComponent role={['GERENTE']}>
                <button onClick={deleteProduct}>Excluir produto</button>
            </PrivateComponent>
        </div>
        </Layout>
    )
}

export default Product