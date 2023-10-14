import { NextFunction, Request, Response } from "express"
import { IResponse } from "../utils/interfaces"
import { messages } from "../utils/messages"
import { HTTP_STATUS_CODES } from "../utils/constants"

class ProductsValidator {

    constructor() {

    }

    validateProductCreation(req: Request, res: Response, next: NextFunction) {
        let response: IResponse = {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            title: messages.products.title,
            message: messages.products.common.errors.badRequest
        }

        try {

            next()
        } catch (error: any) {
            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = error.message
        }

        return res.status(response.status).send(response);

    }

    validateProductId(req: Request, res: Response, next: NextFunction) {
        let response: IResponse = {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            title: messages.products.title,
            message: messages.products.common.errors.badRequest
        }

        try {

            next()
        } catch (error: any) {
            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = error.message
        }

        return res.status(response.status).send(response);
    }

}

export {
    ProductsValidator
}