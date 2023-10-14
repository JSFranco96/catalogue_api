import { Request, Response } from "express";


class TagsController {

    constructor() { }

    getAll(req: Request, res: Response) {
        try {
            return res.status(200).send('ok')
        } catch (error) {
            return res.status(500).send('error')
        }
    }

    create(req: Request, res: Response) {
        try {
            return res.status(200).send('ok')
        } catch (error) {
            return res.status(500).send('error')
        }
    }
}

export { TagsController }