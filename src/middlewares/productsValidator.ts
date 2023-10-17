import { NextFunction, Request, Response } from "express"
import { IResponse } from "../utils/interfaces"
import { messages } from "../utils/messages"
import { HTTP_STATUS_CODES } from "../utils/constants"
import { isValidObjectId } from "mongoose"
import { CREATE_PRODUCT } from "../utils/validators"
import { CreateProductDTO } from "../dto/products/create.dto"
import { Commons } from "../utils/commons"

class ProductsValidator {

    #commons: Commons

    constructor() {
        this.#commons = new Commons()
    }

    validateProductCreation(req: Request, res: Response, next: NextFunction) {

        try {

            console.log('FILE >>', req.file)

            console.log('BODY >>', req.body)
            
            Object.keys(req.body).forEach(key => {
                req.body[key] = JSON.parse(req.body[key]);
            })
            
            const commons = new Commons()
            let error: boolean = commons.ObjectsPropertyValidator(CREATE_PRODUCT, req.body)

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

    validateProductUpdate(req: Request, res: Response, next: NextFunction) {

        try {

            let error: boolean = this.#commons.ObjectsPropertyValidator(req.body, CREATE_PRODUCT)

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

}

export {
    ProductsValidator
}