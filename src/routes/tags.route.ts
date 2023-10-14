import { Router } from "express";
import { TagsController } from "../controllers/tags.controller";


class TagsRouter {
    
    #router: Router
    
    get router(): Router {
        return this.#router
    }

    #routerController: TagsController

    constructor() {
        this.#router = Router()
        this.#routerController = new TagsController()

        this.#initializeRoutes()
    }

    #initializeRoutes(): void {
        this.#router.get('/', this.#routerController.getAll)
        this.#router.post('/', this.#routerController.create)
    }

}

export { TagsRouter }