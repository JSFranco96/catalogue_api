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
