/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const validateValue = (
  value: any,
  validators: any = []
): string | undefined => {
  if (validators.length > 0) {
    const errors: string[] = [];
    validators.forEach((validator: any) => {
      const error = validator(value);
      if (error) {
        errors.push(error);
      }
    });
    if (errors.length > 0) {
      return errors[0];
    }
    return undefined;
  }
  return undefined;
};
