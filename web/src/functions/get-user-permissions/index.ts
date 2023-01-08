import api from "../../services/api"

export const getUser = async (token: string) => {
    api.defaults.headers.authorization = `Bearer ${token}`
    const response = await api.get('/users/role')
    return response
} 