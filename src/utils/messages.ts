export const messages = {
    common: {
        paramsError: 'Los datos enviados no son correctos.'
    },
    products: {
        title: 'Productos',
        common: {
            errors: {
                badRequest: 'Los parámetros enviados no son correctos'
            }
        },
        insert: {
            error: 'Ocurrió un error registrando el producto.',
            ok: 'El producto fue registrado exitosamente.',
        },
        get: {
            error: 'Ocurrió un error consultando los productos.',
            ok: 'Los productos se consultaron exitosamente.'
        },
        getById: {
            error: 'Ocurrió un error consultando el detalle del producto.',
            ok: 'Se consultó el detalle del producto exitosamente'
        },
        update: {
            error: 'Ocurrió un error actualizando el producto.',
            ok: 'Se actualizó el producto exitosamente.'
        },
        delete: {
            error: 'Ocurrió un error eliminando el producto.',
            ok: 'Se eliminó el producto exitosamente'
        }
    },
    tags: {
        title: 'Etiquetas',
        insert: {
            error: 'Ocurrió un error registrando las etiquetas.',
            ok: 'Las etiquetas se registraron exitosamente.'
        },
        get: {
            error: 'Ocurrió un error consultando las etiquetas.',
            ok: 'Las etiquetas se consultaron exitosamente.'
        }
    }
}