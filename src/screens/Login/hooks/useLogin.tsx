import {VStack, Toast, ToastDescription, useToast} from '@gluestack-ui/themed';
import {
  useValidations,
  useShowPassword,
  useAppNavigation,
} from '../../../hooks';
import showToast from '../../../components/showToast/showToast';

export default function useLogin() {
  const {email, validateEmail, password, validatePassword} = useValidations();
  const {showPassword, handleShowPassword} = useShowPassword();

  const toast = useToast();
  const navigation = useAppNavigation();

  const handleValidate = () => {
    validateEmail();
    validatePassword();
  };

  const handleNavigateRegister = () => {
    navigation.navigate('Register');
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
    handleSubmit,
    showPassword,
    handleShowPassword,
    email,
    password,
    handleNavigateRegister,
  };
}
