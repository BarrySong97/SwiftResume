/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PdfSetting } from '../models/PdfSetting';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static appControllerGetPdf(
requestBody: PdfSetting,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pdf',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param name 
     * @returns string 
     * @throws ApiError
     */
    public static appControllerGetHelloName(
name: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hello/{name}',
            path: {
                'name': name,
            },
        });
    }

}
