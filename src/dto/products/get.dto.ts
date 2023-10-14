import { CreateTagDTO } from "../tags/create.dto";

interface CreateProductDTO {
    name: String;
    description: String;
    sku: String;
    images: Array<Images>;
    tags: Array<CreateTagDTO>;
    price: Number;
    stock: Number;
}

interface Images {
    url: String;
    uploaded: Boolean;
}

export { CreateProductDTO }
