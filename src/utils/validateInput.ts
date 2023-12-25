type setValidationFunction = (value: string) => void;

export default function validateInput(
  input: string,
  validationSetter: setValidationFunction,
  condition: boolean,
  invalidMessage?: string,
) {
  const EMPTY_VALUE_ERROR_TEXT = 'tidak boleh kosong';

  if (input === '') {
    validationSetter(EMPTY_VALUE_ERROR_TEXT);
  } else if (condition) {
    validationSetter(invalidMessage!);
  } else {
    validationSetter('');
  }
}
