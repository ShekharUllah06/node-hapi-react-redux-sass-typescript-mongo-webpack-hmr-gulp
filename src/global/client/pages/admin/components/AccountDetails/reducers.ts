/// <reference path="../../../../../../../typings/index.d.ts" />
import * as _ from 'lodash';
import * as actions from './actions';

export const REDUCER_NAME:string = 'accountDetails';

function loading(state, action) {
    return _.merge(
        {},
        state,
        {
            loadFailed: false,
            loading: true
        }
    )
}

function get(state, action) {
    let newState = _.merge(
        {},
        state,
        {
            loadFailed: !_.isUndefined(action.error),
            loading: false,
            data: {}
        }
    )
    newState.data.name = action.data.name;
    newState.data.user = action.data.user;
    newState.data.groups = action.data.groups;
    newState.data.permissions = action.data.permissions;
    
    return newState;
    
}

function unlinkUser(state, action) {
    let newState = _.merge(
        {},
        state,
        {
            data: {}
        }
    )
    newState.data.user = undefined;
    
    return newState;
}

function linkUser(state, action) {
    let newState = _.merge(
        {},
        state,
        {
            data: {}
        }
    )
    newState.data.user = action.data.user;
    
    return newState;
}

export function reducer(state: any = { loading: false }, action) {
    switch(action.type) {
        case actions.LOADING: 
            return loading(state, action);
        case actions.GET:
            return get(state, action);
        case actions.LINK_USER:
            return linkUser(state, action);
        case actions.UNLINK_USER:
            return unlinkUser(state, action);
    }
    return state;
}