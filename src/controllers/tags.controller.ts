import { Request, Response } from "express";
import { IResponse } from "../utils/interfaces";
import { GetProductsDTO } from "../dto/products/get.dto";
import { HTTP_STATUS_CODES } from "../utils/constants";
import { messages } from "../utils/messages";
import { TagsService } from "../services/tags.service";
import { CreateTagDTO } from "../dto/tags/create.dto";

class TagsController {

    #tagsService: TagsService

    constructor() {
        this.#tagsService = new TagsService()
    }

    #configureGetAllResponse(data: Array<any>) {
        return {
            tags: data.map((d: any) => d)
        } as CreateTagDTO
    }

    async getAll(req: Request, res: Response) {
        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.tags.title,
            message: messages.tags.get.ok
        }

        try {

            const getAllData = await this.#tagsService.getAll()

            if (getAllData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.tags.get.error

                return res.status(response.status).json(response)
            }

            const responseObject: CreateTagDTO = this.#configureGetAllResponse(getAllData.data)

            response.object = responseObject
            return res.status(response.status).json(response)

        } catch (error) {

            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.products.get.error

            return res.status(response.status).json(response);
        }
    }

    async create(req: Request, res: Response) {
        let response: IResponse = {
            status: HTTP_STATUS_CODES.OK,
            title: messages.tags.title,
            message: messages.tags.create.ok
        }

        try {

            const createData = await this.#tagsService.create(req.body)

            if (createData.error) {
                response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
                response.message = messages.tags.create.error
            }
            
            return res.status(response.status).json(response)

        } catch (error) {

            response.status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
            response.message = messages.tags.create.error

            return res.status(response.status).json(response);
        }
    }
}

export { TagsController }