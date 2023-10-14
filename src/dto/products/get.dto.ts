import { IImages } from "../../utils/interfaces"
import { CreateTagDTO } from "../tags/create.dto"

interface GetProductsDTO {
    name: string
    sku: string
    price: number
    images: Array<IImages>,
    tags: Array<CreateTagDTO>
}

export { GetProductsDTO }