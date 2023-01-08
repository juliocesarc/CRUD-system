import { Request, Response } from "express"
import { ServerResponse } from "http"
import { z } from "zod"
import ProductRepository from "../repositories/ProductRepository"
import ProductUseCase from "../useCases/products/CreateProductUseCase"

const productUseCase = new ProductUseCase()

class ProductController {
    async create(request: Request, response: Response) {
        const createProductBody = z.object({
            name: z.string(),
            description: z.string(),
        })
        const { name, description } = createProductBody.parse(request.body)
        const { error, product } = await productUseCase.create({ name, description })

        if (error) return response.status(400).json(error)
        return response.json(product)
    }
    
    async show(request: Request, response: Response) {
        const { id } = request.params
        const { error, product } = await productUseCase.listUnique(id)
        if (error) return response.status(400).json(error)
        return response.json(product)
    }

    async index(request: Request, response: Response) {
        const products = await productUseCase.listProducts()
        return response.json(products)
    }

    async delete(request: Request, response: Response) {
        const id = request.body.id
        const { error, success } = await productUseCase.deleteProduct(id)
        if (error) return response.status(400).json(error)
        return response.status(200).json(success)
    }
}

export default new ProductController()