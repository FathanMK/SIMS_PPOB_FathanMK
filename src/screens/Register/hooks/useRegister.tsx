import {useState} from 'react';
import {VStack, Toast, ToastDescription, useToast} from '@gluestack-ui/themed';
import {useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';

import type {INewUser} from '../../../interfaces/INewUser';
import {useAppNavigation, useShowPassword} from '../../../hooks';
import {axiosInstance} from '../../../utils/axiosInstances';
import showToast from '../../../utils/showToast/showToast';

export default function useRegister() {
  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [isLoading, setLoading] = useState(false);
  const {showPassword, handleShowPassword} = useShowPassword();
  const toast = useToast();
  const navigation = useAppNavigation();

  const registerMutation = useMutation({
    mutationFn: (newUser: INewUser) => {
      setLoading(true);
      return axiosInstance.post('/registration', newUser);
    },
    onSuccess() {
      showToast({
        toast,
        renderContent: () => (
          <Toast action="success" variant="accent">
            <VStack space="xs">
              <ToastDescription color="$green500">
                register berhasil, silahkan login
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      setTimeout(() => {
        navigation.navigate('Login');
        setLoading(false);
      }, 1000);
    },
    onError(error: any) {
      showToast({
        toast,
        renderContent: () => (
          <Toast action="error" variant="accent">
            <VStack space="xs">
              <ToastDescription color="$red500">
                cek input kembali
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      setLoading(false);
    },
  });

  const handleNavigateLogin = () => {
    navigation.navigate('Login');
  };

  const onSubmit = (data: any) => {
    const newUser = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
    };

    registerMutation.mutate(newUser);
  };

  return {
    showPassword,
    handleShowPassword,
    handleNavigateLogin,
    control,
    watch,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
  };
}
