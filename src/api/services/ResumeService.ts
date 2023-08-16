/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateResumeDto } from '../models/CreateResumeDto';
import type { ResumeDto } from '../models/ResumeDto';
import type { UpdateResumeDto } from '../models/UpdateResumeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ResumeService {

    /**
     * @param requestBody 
     * @returns ResumeDto 
     * @throws ApiError
     */
    public static resumeControllerCreate(
requestBody: CreateResumeDto,
): CancelablePromise<ResumeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/resume',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns ResumeDto 
     * @throws ApiError
     */
    public static resumeControllerFindAll(): CancelablePromise<Array<ResumeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resume',
        });
    }

    /**
     * @param id 
     * @returns ResumeDto 
     * @throws ApiError
     */
    public static resumeControllerFindOne(
id: string,
): CancelablePromise<ResumeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/resume/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns ResumeDto 
     * @throws ApiError
     */
    public static resumeControllerUpdate(
id: string,
requestBody: UpdateResumeDto,
): CancelablePromise<ResumeDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/resume/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns CreateResumeDto 
     * @throws ApiError
     */
    public static resumeControllerRemove(
id: string,
): CancelablePromise<CreateResumeDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/resume/{id}',
            path: {
                'id': id,
            },
        });
    }

}
