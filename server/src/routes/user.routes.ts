import { Router } from 'express'
import UserController from "../controllers/UserController"

const userRouter = Router()

userRouter
    .post('/', UserController.create)
    .get('/role', UserController.roles)
// .get('/', UserController.index)


export { userRouter }