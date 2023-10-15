import { NextFunction, Request, Response } from "express"
import { IResponse } from "../utils/interfaces"
import { messages } from "../utils/messages"
import { HTTP_STATUS_CODES } from "../utils/constants"
import { isValidObjectId } from "mongoose"
import { CREATE_PRODUCT } from "../utils/validators"
import { CreateProductDTO } from "../dto/products/create.dto"

class ProductsValidator {

    constructor() { }

    validateProductCreation(req: Request, res: Response, next: NextFunction) {

        try {

            const createProducValidator: any = CREATE_PRODUCT
            let error: boolean = false;
            
            for (const key in createProducValidator) {
                // Validamos si el body tiene cada uno de los parámetros requeridos:
                if (!Object.prototype.hasOwnProperty.call(req.body, key)) {
                    error = true
                    break
                }
                // Validamos que sea el mismo tipo de dato:
                if (typeof req.body[key] !== typeof createProducValidator[key]) {
                    error = true
                    break
                }
            }

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
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: error.message
            }

            return res.status(response.status).json(response);
        }


    }

    validateProductId(req: Request, res: Response, next: NextFunction) {

        try {

            if (!req.params.id || !isValidObjectId(req.params.id)) {
                const response: IResponse = {
                    status: HTTP_STATUS_CODES.BAD_REQUEST,
                    title: messages.products.title,
                    message: messages.products.common.errors.badRequest
                }

                return res.status(response.status).json(response);
            }

            next()

        } catch (error: any) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: error.message
            }

            return res.status(response.status).json(response);
        }

    }

}

export {
    ProductsValidator
}