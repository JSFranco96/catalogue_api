import { NextFunction, Request, Response } from "express";
import { IResponse } from "../utils/interfaces";
import { messages } from "../utils/messages";
import { HTTP_STATUS_CODES } from "../utils/constants";
import { Commons } from "../utils/commons";
import { CREATE_TAG } from "../utils/validators";


class TagsValidator {

    #commons: Commons

    constructor() {
        this.#commons = new Commons()
    }

    validateTagsCreate(req: Request, res: Response, next: NextFunction) {
        try {

            let error: boolean = this.#commons.ObjectsPropertyValidator(CREATE_TAG, req.body)

            if (error) {
                const response: IResponse = {
                    status: HTTP_STATUS_CODES.BAD_REQUEST,
                    title: messages.products.title,
                    message: messages.products.common.errors.badRequest
                }
                return res.status(response.status).json(response)
            }

            next()

        } catch (error: any) {
            const response: IResponse = {
                title: messages.tags.title,
                message: error.message,
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            }

            return res.status(response.status).json(response)
        }
    }
}

export { TagsValidator }