import { Request, Response } from "express"
import CreatePermissionUseCase from '../useCases/permissions/CreatePermissionUseCase'

const createPermissionUseCase = new CreatePermissionUseCase()

class PermissionController {
    // Controller: armazena a parte fundamental da lógica por trás da request
    async create(resquest: Request, response: Response) {

        const { name, description } = resquest.body

        const { error, permission } = await createPermissionUseCase.run({ name, description })

        if (error)
            return response.status(400).json({ error })

        response.json(permission)
        console.log("depois de encerrar a requisição")
        return
    }
}

export default new PermissionController()