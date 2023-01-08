import { Router } from "express";
import ProductController from "../controllers/ProductController"

const productsRouter = Router()

productsRouter
    .get('/', ProductController.index) 
    .post('/', ProductController.create)
    .post('/delete', ProductController.delete)
    .post('/:id', ProductController.show);

export { productsRouter }