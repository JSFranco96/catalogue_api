export interface IResponse {
    status: number
    title: string
    message: string
    object?: any
}

export interface IDataResponse {
    error: Boolean;
    data: any
}

export interface IImages {
    name: string
    url: string
    uploaded: Boolean
}

export interface IFileObject {
    Key: string | undefined
    Body: Buffer | undefined
}