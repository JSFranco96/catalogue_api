import { CreateProductDTO } from "../dto/products/create.dto";
import { UpdateProductDTO } from "../dto/products/update.dto";
import { Products } from "../models/products.model";
import { IDataResponse } from "../utils/interfaces";

class ProductsService {

    constructor() { }

    async getAll(page: number, limit: number = 8, filter: string = ''): Promise<IDataResponse> {

        const res: IDataResponse = {
            error: false,
            data: null
        }

        try {
            const skip = page * limit
            if (filter) {
                const $or: any = [
                    { name: { $regex: new RegExp(filter, 'i') } },
                    { sku: { $regex: new RegExp(filter, 'i') } },
                    {
                        tags: {
                            $elemMatch: { $regex: new RegExp(filter, 'i') }
                        }
                    }
                ]
                res.data = {
                    info: await Products.find({ $or }).skip(skip).limit(limit).lean(),
                    total: await Products.find({ $or }).count()
                }
            } else {
                res.data = {
                    info: await Products.find().skip(skip).limit(limit).lean(),
                    total: await Products.count()
                }
            }
        } catch (error) {
            res.error = true;
            res.data = error;
        }

        return res
    }

    async getById(id: string): Promise<IDataResponse> {

        const res: IDataResponse = {
            error: false,
            data: null
        }

        try {
            res.data = await Products.findById(id).lean()
        } catch (error) {
            res.error = true
            res.data = error
        }

        return res
    }

    async create(product: CreateProductDTO): Promise<IDataResponse> {

        const res: IDataResponse = {
            error: false,
            data: null
        }

        try {
            const productModel = new Products(product)
            const newDocument = await Products.create(productModel)
            res.data = newDocument._id.toHexString()
        } catch (error) {
            res.error = true
            res.data = error
        }

        return res
    }

    async update(product: UpdateProductDTO, _id: string): Promise<IDataResponse> {

        const res: IDataResponse = {
            error: false,
            data: null
        }

        try {
            res.data = await Products.findOneAndUpdate({ _id }, { $set: product }).lean()
        } catch (error) {
            res.error = true
            res.data = error
        }

        return res
    }

    async delete(_id: string): Promise<IDataResponse> {

        const res: IDataResponse = {
            error: false,
            data: null
        }

        try {
            res.data = await Products.deleteOne({ _id })
        } catch (error) {
            res.error = true
            res.data = error
        }

        return res
    }
}

export { ProductsService }