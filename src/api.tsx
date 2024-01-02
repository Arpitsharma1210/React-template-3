/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { HttpMethods } from "./utils";
import { config } from "./config";
import { getToken } from "./redux/reducers/auth";

const PING = '/api/ping';
const LOGIN = '/api/login';
export const SET_PASSWORD = '/api/set-password';
export const RESET_PASSWORD = '/api/reset-password';
export const RESET_PASSWORD_REQUEST_LINK = '/api/reset-password/request-link';
export const ADMINS = '/api/admins';
export const ADMIN_FILTER = `${ADMINS}/filter`;
export const ADMIN_RESEND_INVITE = `${ADMINS}/resend-invite`;
export const COMPANIES = '/api/companies';
export const COMPANY_MEMBERS = '/api/company-users';
export const COMPANY_FILTER = `${COMPANIES}/filter`;
export const COMPANY_AUDIT_LOGS_FILTER = `${COMPANIES}/audit-logs/filter`;
export const COMPANY_USER_AUDIT_LOGS_FILTER = `${COMPANY_MEMBERS}/audit-logs/filter`;
export const COMPANY_MEMBER_FILTER = `${COMPANY_MEMBERS}/filter`;
export const COMPANY_MEMBER_INVITE = `${COMPANY_MEMBERS}/invite`;
export const COMPANY_MEMBER_RESEND_INVITE = `${COMPANY_MEMBERS}/resend-invite`;


export const apiCall = (
  endpoint: string,
  method = HttpMethods.GET,
  body?: any,
  isFormData?: boolean
): Promise<any> => {
  const headers = new Headers({
    Accept: "application/json",
  });
  if (!isFormData) {
    headers.append("Content-Type", "application/json");
  }
  const token = getToken();

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  let finalBody: string | null | undefined = body;

  if (body && !isFormData) {
    finalBody = JSON.stringify(body);
  }
  const url = config.apiHost + endpoint;

  return new Promise<any>((resolve, reject) => {
    fetch(url, { body: finalBody, headers, method })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const ping = (): Promise<string> => apiCall(PING);

export const login = (formData: any): Promise<string> => apiCall(LOGIN, HttpMethods.POST, formData);
