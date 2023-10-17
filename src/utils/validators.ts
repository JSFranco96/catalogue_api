import { CreateProductDTO } from '../dto/products/create.dto'
import { CreateTagDTO } from '../dto/tags/create.dto'

export const CREATE_PRODUCT: CreateProductDTO = {
    name: '',
    description: '',
    price: 0,
    sku: '',
    stock: 0,
    tags: ['']
}

export const CREATE_TAG: CreateTagDTO = {
    tags: ['']
}
