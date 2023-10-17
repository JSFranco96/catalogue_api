import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
class ClientS3 {

    #s3Client: S3Client
    #bucket: string
    #rootFolder: string

    constructor() {
        this.#s3Client = new S3Client({
            region: process.env.AWS_S3_REGION || '',
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || ''
            }
        })

        this.#bucket = process.env.AWS_S3_BUCKET || ''
        this.#rootFolder = process.env.AWS_S3_BUCKET_FOLDER || ''

        if (!process.env.AWS_S3_REGION) {
            console.error('❌ No es posible configurar las credenciales para el cliente del SDK de AWS. Comuníquese con javierfranco0904@gmail.com')
        }

    }

    async upload(folder: string, key: string | undefined, body: any): Promise<boolean> {
        const command = new PutObjectCommand({
            Bucket: this.#bucket,
            Key: `${this.#rootFolder}/${folder}/${key}`,
            Body: body
        })

        try {
            await this.#s3Client.send(command)
            console.log('🎉 Objeto cargado exitosamente >> ');
            return true
        } catch (error) {
            console.error('❌ Ocurrió un error cargando el archivo a S3 >> ', error)
            return false
        }
    }

    async get(folder: string, key: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.#bucket,
            Key: `${this.#rootFolder}/${folder}/${key}`
        })

        try {
            const url = await getSignedUrl(this.#s3Client, command, { expiresIn: 60 * 60 })
            return url
        } catch (error) {
            console.error('❌ Ocurrió un error obteniendo el objeto del S3 >> ', error)
            return ''
        }
    }

}

export { ClientS3 }
