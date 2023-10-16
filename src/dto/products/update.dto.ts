import { CreateTagDTO } from "../tags/create.dto"

interface UpdateProductDTO {
    name?: String
    description?: String
    sku?: String
    images?: Array<Images>
    tags?: Array<CreateTagDTO>
    price?: Number
    stock?: Number
}

interface Images {
    url: String
    uploaded: Boolean
}

export { UpdateProductDTO }
