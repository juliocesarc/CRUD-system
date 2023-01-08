import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export type CreatePermissionProps = { name: string, description: string }

// Reponsabilidade: comunicação com banco de dados
class PermissionRepository {
    async exists(args: Prisma.PermissionsCountArgs) {
        const count = await prisma.permissions.count(args)
        return Boolean(count)
    }

    async create({ name, description }: CreatePermissionProps) {
        return await prisma.permissions.create({
            data: {
                name,
                description
            }
        })
    }
}

export default PermissionRepository