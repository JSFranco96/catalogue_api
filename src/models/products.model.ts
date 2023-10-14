import { Schema, model } from 'mongoose'

const productsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            max: 20
        },
        description: {
            type: String,
            required: true,
            max: 250
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            len: 10
        },
        images: [
            {
                url: String,
                uploaded: Boolean
            }
        ],
        tags: [String],
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            require: true
        },
        priceHistory: [
            {
                price: Number,
                date: Date
            }
        ],
        sotckHistory: [
            {
                stock: Number,
                date: Date
            }
        ],
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const Products = model('products', productsSchema)

export { Products }