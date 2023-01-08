import ProductRepository, { type ProductProps } from "../../repositories/ProductRepository"

const productRepository = new ProductRepository()

type Request = ProductProps & { test?: boolean }

class ProductUseCase {
    async create({ name, description }: Request) {

        const existsProduct = await productRepository.exists({ where: { name, } })

        if (existsProduct) return { error: "Product already exists!" }

        const product = await productRepository.create({ name, description })

        return { product }
    }

    async listProducts() {
        const products = await productRepository.listMany()
        return products
    }

    async listUnique(id: string) {
        const exists = await productRepository.exists({where: {id: id}})
        if (!exists) return { error: "Product not found" }
        const product = await productRepository.listUnique({where: {id: id}})
        return { product }
    }

    async deleteProduct(id: string) {
        const exists = await productRepository.exists({where: {id: id}})
        if (!exists) return { error: "Product not found" }
        await productRepository.deleteProduct({where: {id: id}})
        return { success: 'Excluded product' }
    }
}

export default ProductUseCase