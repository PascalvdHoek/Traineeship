// Validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(rules: Validatable): boolean {
  let isValid = true;
  if (rules.required) {
    isValid = isValid && rules.value.toString().trim().length !== 0;
  }
  if (rules.minLength != null && typeof rules.value === 'string') {
    isValid = isValid && rules.value.length >= rules.minLength;
  }
  if (rules.maxLength != null && typeof rules.value === 'string') {
    isValid = isValid && rules.value.length <= rules.maxLength;
  }
  if (rules.min != null && typeof rules.value === 'number') {
    isValid = isValid && rules.value >= rules.min;
  }
  if (rules.max != null && typeof rules.value === 'number') {
    isValid = isValid && rules.value <= rules.max;
  }
  return isValid;
}
