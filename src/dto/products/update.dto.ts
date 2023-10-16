import { IImages } from "../../utils/interfaces"
import { CreateTagDTO } from "../tags/create.dto"

interface UpdateProductDTO {
    name?: String
    description?: String
    sku?: String
    images?: Array<IImages>
    tags?: Array<string>
    price?: Number
    stock?: Number
}

export { UpdateProductDTO }
