import { Request, Response } from "express"
import { Prisma, PrismaClient } from "@prisma/client"
import { Schema, string, z } from "zod"

const prisma = new PrismaClient()


async function exists(args: Prisma.PermissionsCountArgs) {
    const count = await prisma.roles.count(args)
    return Boolean(count)
}

class RolerController {
    async create(resquest: Request, response: Response) {

        const { name, description, permissions } = resquest.body

        const existRole = await exists({where: { name }})

        if (existRole) {
            return response.status(400).json({error: "Role already exists!"})
        }


        const role = await prisma.roles.create({
            data: {
                name,
                description,
            }
        })

        for (let i = 0; i < permissions.length; i++) {
        const existPermission = await prisma.permissions.findUnique({where: {id: permissions[i]}})
        if (existPermission != null) {
            await prisma.permissionRoles.create({
                data: {
                    permissionId: existPermission.id,
                    roleId: role.id
                }
            })   
        }
        }

        const roleUpdate = await prisma.roles.findUnique({where: {id: role.id}})

        return response.json(roleUpdate)
    }
}

export default new RolerController()