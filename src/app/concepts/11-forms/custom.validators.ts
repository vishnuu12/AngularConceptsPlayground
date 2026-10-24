import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * CONCEPT 11c - a CUSTOM validator.
 *
 * A validator is just a function: give it a control, get back `null` when the
 * value is fine, or an object describing the error when it is not. The shape of
 * that error object is what the template reads, e.g. `form.get('username')?.errors?.['forbiddenName']`.
 *
 * This is a factory - it takes the forbidden words and returns the validator,
 * so you can configure it per field.
 */
export function forbiddenNameValidator(forbidden: readonly string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim().toLowerCase();

    if (!value) {
      return null; // let the `required` validator deal with emptiness
    }

    const blocked = forbidden.some((word) => word.toLowerCase() === value);
    return blocked ? { forbiddenName: { value: control.value as string } } : null;
  };
}

/**
 * A GROUP validator: it receives the whole FormGroup, so it can compare two
 * fields against each other. Used here to check that the two passwords match.
 */
export const passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value as string | null;
  const confirm = group.get('confirmPassword')?.value as string | null;

  if (!password || !confirm) {
    return null;
  }

  return password === confirm ? null : { passwordsMismatch: true };
};
