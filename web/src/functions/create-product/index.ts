import api from "../../services/api"


interface ProductProps {
    name: string,
    description: string
}

export const createProduct = async ({ name, description }: ProductProps) => {
    const response = await api.post('/products', { name, description })
    return
}