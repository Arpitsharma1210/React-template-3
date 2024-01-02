import { Status } from "./baseEntiies";


export interface AdminUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status:Status
}

export interface AdminUserList extends AdminUser{
    lastActivity?:string;
    hasTemporaryPassowrd:boolean;
}