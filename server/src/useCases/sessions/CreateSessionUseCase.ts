import UserRepository, { type CreateUserProps } from "../../repositories/UserRepository"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


const userRepository = new UserRepository()

type Request = CreateUserProps



class createSessionUseCase {
    async run({ username, password }: Request) {

        if (!username || !password) return { error: "User or password cannot be null" }

        const user = await userRepository.getUser(username)

        if (!user) return { error: "User not found!" }

        const matchPassword = await compare(password, user.password)

        if (!matchPassword)  return {error: "Incorrect password or username!"}

        const token = sign({
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role.name
        }, 'b6fe3721402a7700a69f858f7d33888a', {
            subject: user.id,
            expiresIn: '1d'
        })

        return { token, user }
    }
}

export default createSessionUseCase