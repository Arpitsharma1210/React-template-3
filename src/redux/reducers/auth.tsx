import { Action, TOKEN_REMOVE, TOKEN_UPDATE } from '../actions';

export enum Right {
    COMPANY_MODULE = 'COMPANY_MODULE',
    ADMIN_MODULE = 'ADMIN_MODULE'
}

export enum AuthenticationStatus {
    AUTHENTICATED = 'AUTHENTICATED',
    SET_PASSWORD = 'SET_PASSWORD',
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
}

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ORG_ADMIN = 'ORG_ADMIN',
    ORG_CREATOR = 'ORG_CREATOR',
    ORG_VIEWER ='ORG_VIEWER',
    INVALID = 'INVALID'
}

export interface AuthState {
    rights: Right[];
    status: AuthenticationStatus;
    role:Role;
    tempPass:boolean;
    token?: string;
    hasStatusAndRight(status ?: AuthenticationStatus, right ?: Right): boolean;
    hasRole(role ?: Role): boolean;
}

export const defaultAuthState:AuthState = {
  rights: [],
  status: AuthenticationStatus.NOT_AUTHENTICATED,
  role: Role.INVALID,
  tempPass: false,
  token: undefined,
  hasStatusAndRight(
    status ?: AuthenticationStatus,
    right ?: Right,
  ): boolean {
    if (!right || this.rights.indexOf(right) >= 0) {
      if (!status || status === this.status) {
        return true;
      }
    }

    return false;
  },
  hasRole(role ?: Role): boolean {
    if (role === this.role) {
      return true;
    }

    return false;
  },
};


const getRightsForRole = (role: Role): Right[] => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return [
        Right.COMPANY_MODULE, Right.ADMIN_MODULE
      ];
    default:
      return [];
  }
};

export function getStateFromToken(state: AuthState, token: string | undefined): AuthState {
  let rights: Right[] | undefined;
  let role:Role;
  let tempPass:boolean;
  let status:AuthenticationStatus;
  if (token) {
    try {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const tokenData: any = JSON.parse(atob(token.split('.')[1]));
      role = Role.SUPER_ADMIN;
      rights = getRightsForRole(role);
      tempPass = !!tokenData?.tempPass;
      status = tempPass ? AuthenticationStatus.SET_PASSWORD :AuthenticationStatus.AUTHENTICATED;
    } catch (e) {
      // This is fine, parsing failed because eg. token is invalid
      rights = undefined;
      role = Role.INVALID;
      tempPass = false;
      status = AuthenticationStatus.AUTHENTICATED;
    }
  } else {
    rights = undefined;
    role = Role.INVALID;
    tempPass = false;
    status = AuthenticationStatus.AUTHENTICATED;
  }

  if (rights) {
    return {
      ...state,
      rights,
      role,
      tempPass,
      token,
      status
    };
  }

  return defaultAuthState;
}

let token: string | undefined;
export default (
  state: AuthState = defaultAuthState,
  action: Action<string>,
):AuthState => {
  token = localStorage.getItem('token') || undefined;

  switch (action.type) {
    case TOKEN_UPDATE:
      token = action.payload;
      localStorage.setItem('token', token);
      return { ...getStateFromToken(state, token) };
    case TOKEN_REMOVE:
      localStorage.removeItem('token');
      token = undefined;
      return { ...getStateFromToken(state, undefined) };
    default:
      return { ...getStateFromToken(state, token) };
  }
};

export const getToken = (): string | undefined => token;
