/// <reference path="../../../../../../typings/index.d.ts" />

import Fetch from '../../../api/jsonfetch';
import ParseValidation, { IValidation } from '../../../api/parsevalidation';

export const GET_RESULTS_REQUEST: string = 'GET_RESULTS_REQUEST';
export const GET_RESULTS_RESPONSE: string = 'GET_RESULTS_RESPONSE';

export const GET_DETAILS_REQUEST: string = 'GET_DETAILS_REQUEST';
export const GET_DETAILS_RESPONSE: string = 'GET_DETAILS_RESPONSE';

export const CREATE_NEW_REQUEST: string = 'CREATE_NEW_REQUEST';
export const CREATE_NEW_RESPONSE: string = 'CREATE_NEW_RESPONSE';

export const DELETE_REQUEST: string = 'DELETE_REQUEST';
export const DELETE_RESPONSE: string = 'DELETE_RESPONSE';

export const SET_SORT_FILTER: string = 'SET_SORT_FILTER';

const SECTION_NAME: string = 'accounts';


export interface IAccountsAbstract {
    type: string;
}

export interface IAccountsSortFilter extends IAccountsAbstract {
    setting: string
}

export interface IAccountsRequest extends IAccountsAbstract {
    data: any;
}

export interface IAccountsResponse extends IAccountsAbstract {
    response?: any;
    success?: boolean;
    message?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

/* **************** Form Send Action Event ********************** */
export function onRequestAction(type: string, data?: any): IAccountsRequest {
    return {
        type,
        data
    };
}

/* **************** Form Send Action Event ********************** */
export function onResultsAction(
    response: any,
    message: string,
    hasError: any,
    help: any,
    success: boolean,
    loading: boolean
): IAccountsResponse {
    return {
        type: GET_RESULTS_RESPONSE,
        response,
        message,
        hasError,
        help,
        success,
        loading
    };
}

export function setSortFilter(sortOrFilter: string): any {

            return {
                type: SET_SORT_FILTER,
                setting: sortOrFilter
            }

}

export function getResults(data: any): any {

    let validation: IValidation;

    return (dispatch: any, getState: any) => {
        dispatch(onRequestAction(GET_RESULTS_REQUEST, data));

        let request: any = {
            method: 'GET',
            url: '/api/' + SECTION_NAME,
            query: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;
            }

            validation = ParseValidation(response.validation, response.message);

            dispatch(
                onResultsAction(
                    response,
                    validation.error,
                    validation.hasError,
                    validation.help,
                    response.success,
                    response.loading
                )
            );
        });
    };
}







export function doDelete(data: any, router: any): any {

    let validation: IValidation;

    return (dispatch: any, getState: any) => {
        dispatch(onRequestAction(DELETE_REQUEST, data));

        let id = data.id;
        delete data.id;

        let request: any = {
            method: 'DELETE',
            url: '/api/' + SECTION_NAME + '/' + id,
            data: data,
            useAuth: true
        };

        Fetch(request, (err: any, response: any) => {

            if (!err) {
                response.success = true;

                if (router) {
                    router.transitionTo(SECTION_NAME);
                    window.scrollTo(0, 0);
                }
            }

            // dispatch delete action
        });
    };
}