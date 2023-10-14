import { Router } from "express";
import { ProductsController } from "../controllers/products.controller";
import { ProductsValidator } from "../middlewares/productsValidator";

class ProductsRouter {

    #router: Router

    get router(): Router {
        return this.#router
    }

    #productController: ProductsController
    #productValidator: ProductsValidator

    constructor() {
        
        this.#router = Router()
        this.#productController = new ProductsController()
        this.#productValidator = new ProductsValidator()

        this.#initializeRoutes()
    }

    #initializeRoutes() {

        this.#router.get(
            '/',
            this.#productController.getAll
        )

        this.#router.get(
            '/:id',
            this.#productValidator.validateProductId,
            this.#productController.getById
        )

        this.#router.post(
            '/',
            this.#productValidator.validateProductCreation,
            this.#productController.create
        )

        this.#router.patch(
            '/:id',
            this.#productValidator.validateProductId,
            this.#productValidator.validateProductCreation,
            this.#productController.update
        )

        this.#router.delete(
            '/:id',
            this.#productValidator.validateProductId,
            this.#productController.delete
        )

    }

}

export { ProductsRouter }