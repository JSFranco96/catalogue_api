import { Request, Response } from "express"
import { HTTP_STATUS_CODES } from "../utils/constants"
import { IResponse } from "../utils/interfaces"
import { messages } from "../utils/messages"
import { ProductsService } from "../services/products.service"
import { GetProductsDTO } from "../dto/products/get.dto"
import { GetProductsByIdDTO } from "../dto/products/getById.dto"
import { ClientS3 } from "../utils/s3"
import { CreateProductDTO } from "../dto/products/create.dto"

class ProductsController {

    constructor() { }

    async getAll(req: Request, res: Response) {

        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.products.title,
            message: messages.products.get.ok
        }
        try {

            let page = 0;
            let limit = 8;
            // Obtenemos el número de la pagina a conulstar:
            if (req.query.page && +req.query.page) {
                page = +req.query.page
            }

            const productService = new ProductsService()
            const getAllData = await productService.getAll(page, limit)

            if (getAllData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.get.error

                return res.status(response.status).json(response)
            }

            const clientS3 = new ClientS3()
            const responseObject: Array<GetProductsDTO> = []
            for (const product of getAllData.data.info) {
                const signedUrl = await clientS3.get(product._id.toHexString(), product.image)

                responseObject.push({
                    name: product.name,
                    sku: product.sku,
                    price: product.price,
                    tags: product.tags,
                    image: signedUrl,
                    _id: product._id
                } as GetProductsDTO)
            }

            response.object = {
                info: responseObject,
                total: getAllData.data.total
            }
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

            const productsService = new ProductsService()
            const getByIdData = await productsService.getById(req.params.id)

            if (getByIdData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.getById.error

                return res.status(response.status).json(response)
            }

            response.object = {
                description: getByIdData.data.description,
                state: getByIdData.data.state,
                stock: getByIdData.data.stock
            } as GetProductsByIdDTO
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

            const productsService = new ProductsService()

            const body: CreateProductDTO = { ...req.body }
            body.image = req.file?.originalname

            const createData = await productsService.create(body)

            if (createData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.create.error

                return res.status(response.status).json(response)
            }

            // En caso de que se haya creado correctamente el registro del producto, 
            // procedemos a registrar las posibles imágenes en el S3:
            const clientS3 = new ClientS3()
            const uploadImagesResponse: boolean =
                await clientS3.upload(
                    createData.data,
                    req.file?.originalname,
                    req.file?.buffer
                )

            if (!uploadImagesResponse) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.uploadImages.error
            }

            response.object = createData.data

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


            const productsService = new ProductsService()
            const body: CreateProductDTO = { ...req.body }

            if (req.file) {
                body.image = req.file.originalname
            } else {
                delete body.image
            }

            const updateData = await productsService.update(body, req.params.id)

            if (updateData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.update.error

                return res.status(response.status).json(response)
            }

            // En caso de existir una imagen nueva, la cargamos
            if (req.file) {

                const clientS3 = new ClientS3()

                const uploadImagesResponse: boolean =
                    await clientS3.upload(
                        updateData.data._id,
                        req.file.originalname,
                        req.file.buffer
                    )

                if (!uploadImagesResponse) {
                    response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                    response.message = messages.products.uploadImages.error
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

            const productService = new ProductsService()
            const deleteData = await productService.delete(req.params.id)

            if (deleteData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.products.delete.error

                return res.status(response.status).json(response)
            }

            return res.status(response.status).json(response)

        } catch (error) {

            console.log(error);


            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.products.delete.error

            return res.status(response.status).json(response);
        }

    }
}

export {
    ProductsController
}