import { Request, Response } from "express"
import { z } from "zod"
import CreateSessionUseCase from "../useCases/sessions/CreateSessionUseCase"

const createSessionUseCase = new CreateSessionUseCase()

class SessionController {
    async create(request: Request, response: Response) {
        const createUserBody = z.object({
            username: z.string(),
            password: z.string(),
        })
        const diceLogin = createUserBody.parse(request.body)
        const { error, token, user } = await createSessionUseCase.run(diceLogin)

        if (error) return response.status(400).json(error)
        return response.json({token, user: {
            id: user?.id,
            name: user?.name,
            username: user?.username,
            role: user?.role.name
        }})
    }
}

export default new SessionController