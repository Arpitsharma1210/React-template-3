import { Role } from '../redux/reducers/auth';
import { Id, Status } from './baseEntiies';

export interface CompanyList {
    id: number;
    name: string;
    domain: string;
    activationDate: string;
    status: Status;
}

export interface CompanyAddress {
    id: number;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface ContactNumber {
    id: number;
    type: string;
    dialCode: string;
    phoneNumber: string;
}

export interface ContactInformation {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    contactNumbers: ContactNumber[];
}

export interface Company {
    id: Id;
    name: string;
    domain: string;
    activationDate: string;
    address: CompanyAddress;
    contactInformation: ContactInformation;
    notes?: string;
    allowNonEmployeeSignup: boolean,
    status: Status,
}

export enum InvitationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REVOKED = 'REVOKED',
}

export interface CompanyMemberList {
    id: Id;
    email: string;
    firstName: string;
    lastName: string;
    companyId: Id;
    invitationStatus: InvitationStatus;
    invitationId: Id;
    isOwner: boolean;
    role: Role;
    status: Status,
}

export interface CompanyAuditLogList {
    id: Id;
    companyId: Id;
    logCode: string;
    logType: string;
    changedEntity?: string;
    oldValue?: string;
    newValue?: string;
    metaData?: Record<string, any>;
    createdOn: string;
}

export interface CompanyUserAuditLogList {
    id: Id;
    companyId: Id;
    firstName: string,
    lastName: string,
    logCode: string;
    logType: string;
    changedEntity?: string;
    oldValue?: string;
    newValue?: string;
    metaData?: Record<string, any>;
    createdOn: string;
}