import api from "../../services/api"

interface UserData {
    name: string,
    username: string,
    password: string,
    role?: string
}

export const createAcount = async ({ username, name, password, role = "80bd23e7-001e-4015-b4c4-bea43ea9b55e" }
: UserData) => {
    const response = await api.post('/users', { username, name, password, role })
    return response
}