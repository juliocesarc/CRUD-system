import { Request, Response } from "express"
import { decode } from "jsonwebtoken"
import { z } from "zod"
import { CreateUserProps } from "../repositories/UserRepository"
import CreateUserUseCase from "../useCases/users/CreateUserUseCase"

const createUserUseCase = new CreateUserUseCase()


class UserController {
    async create(request: Request, response: Response) {
        const createUserBody = z.object({
            name: z.string(),
            username: z.string(),
            password: z.string(),
            role_user: z.string()
        })

        const userData = createUserBody.parse(request.body)
        const { message, user } = await createUserUseCase.create(userData)

        if (message) return response.status(400).json(message)
        return response.json(user)
    }

    async roles(request: Request, response: Response) {
        const authHeader = request.headers.authorization || ""
        const [, token] = authHeader.split(' ')

        if (!token) {
            console.log('Parou aqui 1')
            return response.status(401).json({message: "Not authorized!"})
        }
        const payload = decode(token)
        if (!payload) {
            console.log('Parou aqui 2')
            return response.status(401).json({message: "Not authorized!"})
        }
        
        return response.json(payload)
        
    }
}

export default new UserController();