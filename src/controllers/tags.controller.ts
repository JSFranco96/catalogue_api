import { Request, Response } from "express";


class TagsController {

    constructor() { }

    getAll(req: Request, res: Response) {
        try {
            return res.status(200).json('ok')
        } catch (error) {
            return res.status(500).json('error')
        }
    }

    create(req: Request, res: Response) {
        try {
            return res.status(200).json('ok')
        } catch (error) {
            return res.status(500).json('error')
        }
    }
}

export { TagsController }