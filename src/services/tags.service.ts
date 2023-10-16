import { CreateTagDTO } from "../dto/tags/create.dto";
import { Tags } from "../models/tags.model";
import { IDataResponse } from "../utils/interfaces";


class TagsService {

    constructor() { }

    async getAll(): Promise<IDataResponse> {
        const res: IDataResponse = {
            error: false,
            data: null
        }

        try {
            res.data = await Tags.find().lean()
        } catch (error) {
            res.error = true
            res.data = null
        }

        return res
    }

    async create(tags: CreateTagDTO): Promise<IDataResponse> {
        const res: IDataResponse = {
            error: false,
            data: null
        }

        try {
            const tagModels = tags.tags.map(e => new Tags(e))
            const newDocuments = await Tags.insertMany(tagModels)
            res.data = newDocuments
        } catch (error) {
            res.data = null
            res.error = true
        }

        return res
    }
}

export { TagsService }