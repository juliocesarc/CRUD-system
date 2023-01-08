import { PrismaClient, Prisma, Product } from "@prisma/client";

const prisma = new PrismaClient()

export type ProductProps = {
    id?: string,
    name: string,
    description: string
}

type ProductErrorProps = {
    id: string
}

class ProductRepository {
    async exists(args: Prisma.ProductCountArgs) {
        const count = await prisma.product.count(args)
        return Boolean(count)
    }

    async create({name, description}: ProductProps) {
        const product = await prisma.product.create({
            data: {
                name,
                description
            }
        })
        return product
    }

    async listMany() {
        const products = await prisma.product.findMany({select: {
            id: true,
            name: true,
            description: true,
            createdAt: true
        }})
        return products
    }

    async listUnique(args: Prisma.ProductFindUniqueArgs) {
        const product = await prisma.product.findUnique(args)
        return product
    }

    async deleteProduct(args: Prisma.ProductDeleteArgs) {
        const product = await prisma.product.delete(args)
        return
    }
}

export default ProductRepository