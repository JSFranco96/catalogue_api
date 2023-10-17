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
        image: {
            type: String,
            required: true
        },
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
        stockHistory: [
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

// Con este hook, interceptamos el momento en que se vaya a actualizar el producto
// con el método "findOneAndUpdate" para verificar si los campos "price" o "stock"
// se están actualizando y así guardar el historial de cambios de estos.
productsSchema.pre('findOneAndUpdate', async function () {
    try {
        const newPrice = this.get('price')
        const newStock = this.get('stock')
        const _id = this.get('_id')
        const current = await Products.findById(_id, { price: 1, stock: 1 }).lean()
        if (current && current.price && current.stock) {

            let $push: any = {}

            if (current.price !== newPrice) {
                $push.priceHistory = {
                    price: current.price,
                    date: new Date()
                }
            }

            if (current.stock !== newStock) {
                $push.stockHistory = {
                    stock: current.stock,
                    date: new Date()
                }
            }

            if ($push) {
                await Products.updateOne({ _id }, { $push })
            }
        }
    } catch (error) {
        console.log('❌ Error en hook para actualizar historial de price y stock', error)
    }
})

const Products = model('products', productsSchema)


export { Products }