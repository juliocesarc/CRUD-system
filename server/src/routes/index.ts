import { Router } from 'express'
import SessionController from "../controllers/SessionController"
import PermissionController from "../controllers/PermissionController"
import RolerController from '../controllers/RolerController'
import { userRouter } from "./user.routes"
import { is } from '../middlewares/permission'
import { productsRouter } from './product.routes'
import UserController from '../controllers/UserController'
import ProductController from '../controllers/ProductController'

const router = Router()

router.use('/users', userRouter)
router.use('/products', productsRouter)

router.post('/sessions', SessionController.create)
router.post('/permissions', PermissionController.create)
router.post('/roles', RolerController.create)

export { router }
