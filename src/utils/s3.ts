import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";

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

    async upload(folder: string, key: string, body: any): Promise<boolean> {
        const command = new PutObjectCommand({
            Bucket: this.#bucket,
            Key: `${this.#rootFolder}/${folder}/${key}`,
            Body: body
        })

        try {
            const response = await this.#s3Client.send(command)
            console.log('🎉 Objeto cargado exitosamente >> ', response);
            return true
        } catch (error) {
            console.error('❌ Ocurrió un error cargando el archivo a S3 >> ', error)
            return false
        }
    }

    async get(folder: string, key: string): Promise<any> {
        const command = new GetObjectCommand({
            Bucket: this.#bucket,
            Key: `${this.#rootFolder}/${folder}/${key}`
        })

        try {
            const response = await this.#s3Client.send(command)
            const str = await response.Body?.transformToString()
            console.log('🎉 Objecto obtenido exitosamente >> ', str)
            return str
        } catch (error) {
            console.error('❌ Ocurrió un error obteniendo el objeto del S3 >> ', error)
            return null
        }
    }

    async delete(folder: string, keys: Array<string>): Promise<boolean> {
        const objKeys = keys.map((key: string) => {
            return {
                Key: `${this.#rootFolder}/${folder}/${key}`
            }
        })

        const command = new DeleteObjectsCommand({
            Bucket: this.#bucket,
            Delete: {
                Objects: [...objKeys, { Key: folder }]
            }
        })

        try {
            const { Deleted } = await this.#s3Client.send(command)
            if (!Deleted) {
                console.log('🔍 No se encontraron objetos para elminar')
                return true
            }
            console.log(
                `🎉 Se eliminaron exitosamente ${Deleted.length} objetos del bucket de S3. Objetos eliminados:`,
            );
            console.log(Deleted.map((d) => ` • ${d.Key}`).join("\n"));
            return true
        } catch (error) {
            console.error('❌ Ocurrió un error eliminando los objetos del S3 >> ', error)
            return false
        }
    }


}