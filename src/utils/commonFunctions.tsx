import moment from 'moment';
import { config } from '../config';
import { InvitationStatus } from '../models';
import messages from '../messages';
import { Role } from '../redux/reducers/auth';

export const convertIsoDatoToIsoDateTime = (
  date?: string,
): string | undefined => {
  if (!date) {
    return undefined;
  }
  return `${date}T${moment().format('HH:mm:ssZ')}`;
};

export const convertToIsoDateTime = (date?: string): string | undefined => {
  if (!date) {
    return undefined;
  }
  return moment(date).format('YYYY-MM-DDTHH:mm:ssZ');
};

export const convertToIsoDate = (date?: string): string | undefined => {
  if (!date) {
    return undefined;
  }
  return moment(date).format('YYYY-MM-DD');
};

export const isUndefined = (value: unknown): boolean => value === undefined;
export const isNull = (value: unknown): boolean => value === null;

export const getApiDate = (
  value: string | moment.Moment | undefined | null,
): string | undefined | null => {
  if (isNull(value)) return null;
  if (isUndefined(value)) return undefined;
  return convertToIsoDate(value as string);
};



/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const getEditUrl = (route: string) => (entity: any): string => route.replace(':id', entity?.id);


export const convertSingleToDoubleDigit = (
  value?: number,
): string | undefined => {
  if (value === undefined) return undefined;

  if (value >= 0 && value <= 9) {
    return `0${value}`;
  }
  return `${value}`;
};

export const getSanitizedPhoneNumber = (phone?: string, dialcode?: string): (string | undefined) => {
  if (!dialcode) {
    return phone
  }
  return phone?.replace(dialcode, '')
}

export const getLabelForInvitationStatus = (invitationStatus?: InvitationStatus) => {
  switch (invitationStatus) {
    case InvitationStatus.PENDING:
      return messages?.companyMember?.listing?.invitationStatus?.pending;
    case InvitationStatus.ACCEPTED:
      return messages?.companyMember?.listing?.invitationStatus?.accepted;
    case InvitationStatus.REVOKED:
      return messages?.companyMember?.listing?.invitationStatus?.revoked;
    default:
      return null

  }
}

export const getLabelForMemberRole = (role?: Role) => {
  // console.log(role);  // check role here
  switch (role) {
    case Role.ORG_ADMIN:
      return messages?.companyMember?.listing?.memberRole?.ORG_ADMIN;
    case Role.ORG_CREATOR:
      return messages?.companyMember?.listing?.memberRole?.ORG_CREATOR;
    case Role.ORG_VIEWER:
      return messages?.companyMember?.listing?.memberRole?.ORG_VIEWER;
    default:
      return null

  }
}