

/*
    - Criar uma função que recebe uma request como parâmetro
        - A partir dessa request fazer a coleta do token (Caso tenha),
        se não tiver, retornar undefined
        - Com o tokem em mãos, obter o id do usuário contido nele.
        - Realizar a busca na tabela de usuários pelo id, trazendo 
        apenas a informação de role_user
        - Retornar a role deste usuário
    
    - Criar uma função que recebe como parâmetro um array de strings
        - uma constante que armazena a função com a lógica, essa função
        tem como parâmetro Request, Response, NextFunction;
        - dentro dessa função incluir uma constante role, que invoca a
        primeira função passando como parâmetro nossa Request
        - caso role esteja contida dentro do array de strings (Permissões)
        retornar a função next();
        - Se não tiver contida, retonar uma resposta com status 401 e uma
        mensagem json "Not authorized"
*/


import { PrismaClient } from "@prisma/client"
import { Request, Response, NextFunction } from "express"
import { decode } from "jsonwebtoken"

const prisma = new PrismaClient()

async function getRole(request: Request) {
    const authHeader = request.headers.authorization || ""

    const [ , token] = authHeader?.split(" ")
    if (!token) return 
    const idStr = String(decode(token)?.sub)

    const user = await prisma.users.findUnique({where: {id: idStr}, select: {role: {select: {name: true}}}})

    return user ? user.role.name : undefined
}


function is(allowedRoles: String[]) {

    const roleAuthorized = async (request: Request, response: Response, next: NextFunction) => {
        const userRole = await getRole(request)

        if (!userRole || !allowedRoles.includes(userRole)) {
            return response.status(401).json({message: 'Not authorized!'})
        }

        return next()
    }
    return roleAuthorized
}

export {is}