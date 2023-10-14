import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../utils/constants"
import { IResponse } from "../utils/interfaces"
import { messages } from "../utils/messages"

class ProductsController {

    constructor() {

    }

    async create(req: Request, res: Response) {

        try {

            const response: IResponse = {
                status: HTTP_STATUS_CODES.OK,
                title: messages.products.title,
                message: messages.products.insert.ok,
                object: {}
            }

            return res.status(response.status).send(response)
        } catch (error) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: messages.products.insert.error
            }
            return res.status(response.status).json(response);
        }

    }

    async getAll(req: Request, res: Response) {

        try {

            const response: IResponse = {
                status: HTTP_STATUS_CODES.OK,
                title: messages.products.title,
                message: messages.products.insert.ok,
                object: {}
            }

            return res.status(response.status).send(response)
        } catch (error) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: messages.products.insert.error
            }
            return res.status(response.status).json(response);
        }

    }

    async getById(req: Request, res: Response) {

        try {

            const response: IResponse = {
                status: HTTP_STATUS_CODES.OK,
                title: messages.products.title,
                message: messages.products.insert.ok,
                object: {}
            }

            return res.status(response.status).send(response)
        } catch (error) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: messages.products.insert.error
            }
            return res.status(response.status).json(response);
        }

    }

    async update(req: Request, res: Response) {

        try {

            const response: IResponse = {
                status: HTTP_STATUS_CODES.OK,
                title: messages.products.title,
                message: messages.products.insert.ok,
                object: {}
            }

            return res.status(response.status).send(response)
        } catch (error) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: messages.products.insert.error
            }
            return res.status(response.status).json(response);
        }

    }

    async delete(req: Request, res: Response) {

        try {

            const response: IResponse = {
                status: HTTP_STATUS_CODES.OK,
                title: messages.products.title,
                message: messages.products.insert.ok,
                object: {}
            }

            return res.status(response.status).send(response)
        } catch (error) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: messages.products.insert.error
            }
            return res.status(response.status).json(response);
        }

    }
}

export {
    ProductsController
}