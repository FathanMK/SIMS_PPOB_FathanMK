import {VStack, Toast, ToastDescription, useToast} from '@gluestack-ui/themed';

import {
  useValidations,
  useAppNavigation,
  useShowPassword,
} from '../../../hooks';
import showToast from '../../../components/showToast/showToast';

export default function useRegister() {
  const {
    email,
    validateEmail,
    firstName,
    validateFirstName,
    lastName,
    validateLastName,
    password,
    validatePassword,
    confirmPassword,
    validateConfirmPassword,
  } = useValidations();
  const {showPassword, handleShowPassword} = useShowPassword();

  const toast = useToast();
  const navigation = useAppNavigation();

  const handleValidate = () => {
    validateEmail();
    validateFirstName();
    validateLastName();
    validatePassword();
    validateConfirmPassword();
  };

  const handleNavigateLogin = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = () => {
    handleValidate();

    showToast({
      toast,
      renderContent: () => (
        <Toast action="error" variant="accent">
          <VStack space="xs">
            <ToastDescription color="$red500">
              cek ulang input kembali
            </ToastDescription>
          </VStack>
        </Toast>
      ),
    });
  };

  return {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    handleSubmit,
    showPassword,
    handleShowPassword,
    handleNavigateLogin,
  };
}
