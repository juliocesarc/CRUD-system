import UserRepository from "../../repositories/UserRepository";
import { hash } from "bcryptjs"


const userRepository = new UserRepository()

type UserProps = {
    username: string;
    password: string;
    name: string;
    role_user: string;
}

class CreateUserUseCase {
    async create(args: UserProps) {
        const existUser = await userRepository.exists({ where: { username: args.username }})

        if (existUser) return { message: "User already exists!" }

        const passwordHashed = await hash(args.password, 8)

        const user = await userRepository.create({
            data: {
                name: args.name,
                username: args.username,
                password: passwordHashed,
                role_user: args.role_user
            }
        })

        return { user }
    }
}

export default CreateUserUseCase