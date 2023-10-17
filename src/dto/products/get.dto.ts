
interface GetProductsDTO {
    name: string
    sku: string
    price: number
    image?: string,
    tags: Array<string>
}

export { GetProductsDTO }