import { IImages } from "../../utils/interfaces"

interface CreateProductDTO {
    name: string
    description: string
    sku: string
    image?: string
    tags: Array<string>
    price: number
    stock: number
}

export { CreateProductDTO }
