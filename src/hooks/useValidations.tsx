import {useState, useCallback} from 'react';
import validateInput from '../utils/validateInput';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CHECK_VALUE_ERROR_TEXT = 'cek input kembali';
const DIFFERENT_PASSWORD_CONFIRM_PASSWORD_ERROR_TEXT = 'cek password kembali';
const PASSWORD_MIN_8_ERROR_TEXT = 'minimal 8 karakter';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [validation, setValidation] = useState('');

  return {value, setValue, validation, setValidation};
};

export default function useValidations() {
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');

  const validateEmail = useCallback(
    () =>
      validateInput(
        email.value,
        email.setValidation,
        !regexEmail.test(email.value),
        CHECK_VALUE_ERROR_TEXT,
      ),
    [email.value, email.setValidation],
  );

  const validatePassword = useCallback(
    () =>
      validateInput(
        password.value,
        password.setValidation,
        password.value.length < 8,
        PASSWORD_MIN_8_ERROR_TEXT,
      ),
    [password.value, password.setValidation],
  );

  const validateConfirmPassword = useCallback(
    () =>
      validateInput(
        confirmPassword.value,
        confirmPassword.setValidation,
        password.value !== confirmPassword.value,
        DIFFERENT_PASSWORD_CONFIRM_PASSWORD_ERROR_TEXT,
      ),
    [confirmPassword.value, confirmPassword.setValidation, password.value],
  );

  const validateFirstName = useCallback(
    () => validateInput(firstName.value, firstName.setValidation, false),
    [firstName.value, firstName.setValidation],
  );

  const validateLastName = useCallback(
    () => validateInput(lastName.value, lastName.setValidation, false),
    [lastName.value, lastName.setValidation],
  );

  return {
    email,
    validateEmail,
    password,
    validatePassword,
    confirmPassword,
    validateConfirmPassword,
    firstName,
    validateFirstName,
    lastName,
    validateLastName,
  };
}
