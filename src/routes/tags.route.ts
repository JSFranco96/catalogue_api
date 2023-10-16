import { Router } from "express";
import { TagsController } from "../controllers/tags.controller";
import { TagsValidator } from "../middlewares/tagsValidator";


class TagsRouter {

    #router: Router

    get router(): Router {
        return this.#router
    }

    #routerController: TagsController
    #tagValidator: TagsValidator

    constructor() {
        this.#router = Router()
        this.#routerController = new TagsController()
        this.#tagValidator = new TagsValidator()

        this.#initializeRoutes()
    }

    #initializeRoutes(): void {
        this.#router.get('/', this.#routerController.getAll)
        this.#router.post('/', this.#tagValidator.validateTagsCreate, this.#routerController.create)
    }

}

export { TagsRouter }