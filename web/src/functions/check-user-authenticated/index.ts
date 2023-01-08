import { parseCookies } from "nookies"

export const checkUserAuthenticated = () => {
    const { "permissionToken": token } = parseCookies()
    return !!token
}