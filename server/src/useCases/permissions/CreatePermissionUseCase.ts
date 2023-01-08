import PermissionRepository, { type CreatePermissionProps } from "../../repositories/PermissionRepository"

const permissionRepository = new PermissionRepository()

type Request = CreatePermissionProps & { test?: boolean }

class CreatePermissionUseCase {
    async run({ name, description }: Request) {
        const existsPermission = await permissionRepository.exists({ where: { name } })

        if (existsPermission) {
            return { error: "Permission already exists!" }
        }

        const permission = await permissionRepository.create({ name, description })

        return { permission }
    }
}

export default CreatePermissionUseCase