interface GetProductsDTO {
    _id: string
    name: string
    sku: string
    price: number
    image?: string,
    tags: Array<string>
}

export { GetProductsDTO }