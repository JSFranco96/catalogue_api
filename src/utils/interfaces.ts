export interface IResponse {
    status: number;
    title: String;
    message: String;
    object?: any;
}

export interface IDataResponse {
    error: Boolean;
    data: any
}

export interface IImages {
    url: String
    uploaded: Boolean
}