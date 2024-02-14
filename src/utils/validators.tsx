/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Joi from "joi";
import { ErrorMessage, Validator } from "../hooks";
import messages from "../messages";
import { allAllowedTLDsListFromIANAregistry } from "./tldsListData";
import moment from "moment";

export const required = (
  errMessage: string,
): Validator => (
  value: any,
): ErrorMessage => (
    !value || value.length === 0
      ? errMessage : undefined);

export const requiredIf = (
  errMessage: string,
  callback: (formValues: any) => boolean,
): Validator => (
  value: any, formValues: any,
): ErrorMessage => {
    if (callback(formValues)) {
      return required(errMessage)(value);
    }
    return 'undefined';
  };

export const emailValidator = (
  value?: string,
): ErrorMessage => {
  try {
    const result = Joi.string().lowercase().email({
      minDomainSegments: 2,
      tlds: { allow: allAllowedTLDsListFromIANAregistry },
    }).validate(value);

    if (result.error) {
      return messages.general.errors.emailInvalid;
    }
    return undefined;
  } catch (error) {
    return messages.general.errors.emailInvalid;
  }
}

export const passwordValidator = (
  value?: string,
): ErrorMessage => (
  value && !/^(?=.*[a-z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/.test(value)
    ? messages.general.errors.passwordInvalid
    : undefined
);

export const confirmPassword = (
  errMessage: string,
  validateWith = 'password',
): Validator => (
  value: any, formValues: any,
): ErrorMessage => (
    value && formValues?.[validateWith]?.value !== value
      ? errMessage
      : undefined);

      export const validateDate = (
        message: string,
      ) => (value?: string): ErrorMessage => (
        value && !moment(value).isValid()
          ? message : undefined);

