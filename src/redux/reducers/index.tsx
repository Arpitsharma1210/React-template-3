import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import auth, { AuthState } from './auth';
import { AdminUserList, CompanyAuditLogList, CompanyList, CompanyMemberList, CompanyUserAuditLogList, PagedEntity } from '../../models';
import {  } from '../actions';
import { createPagedReducer } from './utils';


export interface ReduxState {
    router: RouterState;
    auth: AuthState;
}


const createRootReducer = (history: History): Reducer => combineReducers<ReduxState>({
    /* Start Third party reducers */
    router: connectRouter(history),
    /* End Third party reducers */
    auth
});
export default createRootReducer;