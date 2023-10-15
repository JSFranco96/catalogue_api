import { Request, Response } from "express"
import { HTTP_STATUS_CODES } from "../utils/constants"
import { IResponse } from "../utils/interfaces"
import { messages } from "../utils/messages"
import { ProductsService } from "../services/product.service"
import { GetProductsDTO } from "../dto/products/get.dto"
import { GetProductsByIdDTO } from "../dto/products/getById.dto"

class ProductsController {

    #productService: ProductsService

    constructor() {
        this.#productService = new ProductsService()
    }

    #configureGetAllResponse(data: Array<any>): Array<GetProductsDTO> {

        if (!data || !data.length) {
            return []
        }

        const response: Array<GetProductsDTO> = data.map((product: any) => {
            return {
                name: product.name,
                sku: product.sku,
                price: product.price,
                tags: product.tags,
                images: product.images
            } as GetProductsDTO
        })

        return response

    }

    #configureGetByIdResponse(data: Array<any>): Array<GetProductsByIdDTO> {

        if (!data || !data.length) {
            return []
        }

        const response: Array<GetProductsByIdDTO> = data.map((product: any) => {
            return {
                descrition: product.description,
                state: product.state,
                stock: product.stock
            } as GetProductsByIdDTO
        })

        return response

    }

    async getAll(req: Request, res: Response) {

        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.products.title,
            message: messages.products.get.ok
        }

        try {

            const getAllData = await this.#productService.getAll()

            if (getAllData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.get.error

                return res.status(response.status).send(response)
            }

            const responseObject: Array<GetProductsDTO> = this.#configureGetAllResponse(getAllData.data)

            response.object = responseObject
            return res.status(response.status).send(response)

        } catch (error) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: messages.products.get.error
            }
            return res.status(response.status).json(response);
        }

    }

    async getById(req: Request, res: Response) {

        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.products.title,
            message: messages.products.getById.ok
        }

        try {

            const getByIdData = await this.#productService.getById(req.params.id)

            if (getByIdData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.getById.error

                return res.status(response.status).send(response)
            }

            const responseObject: Array<GetProductsByIdDTO> = this.#configureGetByIdResponse(getByIdData.data)

            response.object = responseObject
            return res.status(response.status).send(response)

        } catch (error) {
            const response: IResponse = {
                status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                title: messages.products.title,
                message: messages.products.getById.error
            }
            return res.status(response.status).json(response);
        }

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

        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.products.title,
            message: messages.products.delete.ok
        }

        try {

            const deleteData = await this.#productService.delete(req.params.id)

            if (deleteData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.delete.error

                return res.status(response.status).send(response)
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