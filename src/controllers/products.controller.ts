import { Request, Response } from "express"
import { HTTP_STATUS_CODES } from "../utils/constants"
import { IImages, IResponse } from "../utils/interfaces"
import { messages } from "../utils/messages"
import { ProductsService } from "../services/products.service"
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

    async #uploadProductImagesToS3(productId: string, images: Array<IImages>): Promise<boolean> {
        return true
    }

    async #deleteProductImagesFromS3(productId: string): Promise<boolean> {
        return true
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

                return res.status(response.status).json(response)
            }

            const responseObject: Array<GetProductsDTO> = this.#configureGetAllResponse(getAllData.data)

            response.object = responseObject
            return res.status(response.status).json(response)

        } catch (error) {

            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.products.get.error

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

                return res.status(response.status).json(response)
            }

            const responseObject: Array<GetProductsByIdDTO> = this.#configureGetByIdResponse(getByIdData.data)

            response.object = responseObject
            return res.status(response.status).json(response)

        } catch (error) {

            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.products.getById.error

            return res.status(response.status).json(response);
        }

    }

    async create(req: Request, res: Response) {

        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.products.title,
            message: messages.products.create.ok
        }

        try {

            const createData = await this.#productService.create(req.body)

            if (createData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.create.error

                return res.status(response.status).json(response)
            }

            // En caso de que se haya creado correctamente el registro del producto, 
            // procedemos a registrar las posibles imágenes en el S3:
            const uploadImagesResponse: boolean = await this.#uploadProductImagesToS3(req.body.images, createData.data)

            if (!uploadImagesResponse) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.uploadImages.error
            }

            return res.status(response.status).json(response)

        } catch (error) {

            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.products.create.error

            return res.status(response.status).json(response);
        }

    }

    async update(req: Request, res: Response) {

        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.products.title,
            message: messages.products.update.ok
        }

        try {

            const createData = await this.#productService.update(req.body, req.params.id)

            if (createData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.update.error

                return res.status(response.status).json(response)
            }

            // En caso de que se actualice correctamente el producto, procedemos a eliminar
            // y registrar de nuevo las imágenes en el S3 en caso de que haya cambios, es decir,
            // si existe la propiedad "images" en el body recibido
            if (req.body.images) {
                
                const deleteImagesResponse: boolean = await this.#deleteProductImagesFromS3(req.params.id)

                if (!deleteImagesResponse) {
                    response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                    response.message = messages.products.deleteImages.error

                    return res.status(response.status).json(response)
                }

                const uploadImagesResponse: boolean = await this.#uploadProductImagesToS3(req.body.images, createData.data)
    
                if (!uploadImagesResponse) {
                    response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                    response.message = messages.products.uploadImages.error
                    return res.status(response.status).json(response)
                }

            } 

            return res.status(response.status).json(response)

        } catch (error) {

            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.products.update.error

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

                return res.status(response.status).json(response)
            }

            // En caso de que se haya eliminado correctamente la información del producto, 
            // procedemos a eliminar las posibles imágenes que tenga en el S3:
            const deleteImagesResponse: boolean = await this.#deleteProductImagesFromS3(req.params.id)

            if (!deleteImagesResponse) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.deleteImages.error
            }

            return res.status(response.status).json(response)

        } catch (error) {

            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.products.delete.error

            return res.status(response.status).json(response);
        }

    }
}

export {
    ProductsController
}