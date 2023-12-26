import {useState} from 'react';

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const [validation, setValidation] = useState('');

  return {value, setValue, validation, setValidation};
}
