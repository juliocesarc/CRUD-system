import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

interface roleProps {
    id: string
    name: string
    description: string
    createdAt: string
}

export type CreateUserProps = {
    id?: string;
    username: string;
    name?: string;
    password: string;
    role?: Array<roleProps> | any;
}


class UserRepository {
    async getUser(args: string): Promise<CreateUserProps | null> { 
        const user = await prisma.users.findUnique({
            where: { username: args },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                password: true
            }
        })
        return user
    }

    async exists(args: Prisma.UsersCountArgs) {
        const count = await prisma.users.count(args)
        return Boolean(count)
    }

    async create(args: Prisma.UsersCreateArgs) {
        const user = await prisma.users.create(args)
        return user
    }
}

export default UserRepository