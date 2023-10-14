import { IImages } from "../../utils/interfaces"
import { CreateTagDTO } from "../tags/create.dto"

interface CreateProductDTO {
    name: String
    description: String
    sku: String
    images: Array<IImages>
    tags: Array<CreateTagDTO>
    price: Number
    stock: Number
}

export { CreateProductDTO }