import axios from 'axios';
import {AxiosPromise, AxiosResponse} from 'axios';
import {URLSearchParams} from 'url';

export enum RequestType {
    GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE',
}

export interface RequestService<D, T, R, O> {
    header?: any;
    responseType?: string;
    type: RequestType;
    url: ((data: D) => string) | string;

    queryparams?(data: D): URLSearchParams;

    preprocess(data: D): T;

    postprocess(response: AxiosPromise<R>): Promise<O>;
}

function sendRequest<T, R>(type: RequestType, header: any, queryparams: any,
                           responseType: string, data: T, url: string): AxiosPromise<R> {
    switch (type) {
        case RequestType.GET:
            return axios.get<R>(url, {
                headers: header,
                params: queryparams,
                responseType,
            });
        case RequestType.POST:
            return axios.post<R>(url, data, {
                headers: header,
                params: queryparams,
                responseType,
            });
        case RequestType.PUT:
            return axios.put<R>(url, data, {
                headers: header,
                params: queryparams,
                responseType,
            });
        case RequestType.DELETE:
            return axios.delete(url, {
                headers: header,
                params: queryparams,
                responseType,
            }) as AxiosPromise<R>;
        default:
            return new Promise<AxiosResponse<R>>((resolve, reject) => {
                reject();
            });
    }
}

export function schedule<D, T, R, O>(request: RequestService<D, T, R, O>, data: D): Promise<O> {
    return new Promise<O>((resolve, reject) => {
        request.postprocess(sendRequest(request.type,
            request.header ? request.header : {},
            request.queryparams ? request.queryparams(data) : undefined,
            request.responseType ? request.responseType : 'application/json',
            request.preprocess(data),
            typeof request.url === 'string' ? request.url : request.url(data)))
            .then(value => resolve(value))
            .catch(reason => reject(reason));
    });
}
