import {VStack, Toast, ToastDescription, useToast} from '@gluestack-ui/themed';
import {useForm, SubmitHandler} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';

import {useShowPassword, useAppNavigation} from '../../../hooks';
import showToast from '../../../utils/showToast/showToast';
import {axiosInstance, axiosInstanceWAuth} from '../../../utils/axiosInstances';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {setToken, setUser, setBalance} from '../../../slices/user/userSlice';

interface ILoginFormValues {
  email: string;
  password: string;
}

export default function useLogin() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {showPassword, handleShowPassword} = useShowPassword();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: (user: any) => {
      setLoading(true);
      return axiosInstance.post('/login', user);
    },
    onSuccess: async data => {
      showToast({
        toast,
        renderContent: () => (
          <Toast action="success" variant="accent">
            <VStack space="xs">
              <ToastDescription color="$green500">
                login berhasil, mohon ditunggu
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      const token = data.data.data.token;
      dispatch(setToken(token));
      await axiosInstanceWAuth(token)
        .get('/profile')
        .then(response => {
          const {data} = response.data;
          dispatch(setUser(data));
        })
        .catch(error => console.log(error));
      await axiosInstanceWAuth(token)
        .get('/balance')
        .then(response => {
          const {data} = response.data;
          dispatch(setBalance(data.balance));
          navigation.navigate('Home');
          setLoading(false);
        })
        .catch(error => console.log(error));
    },
    onError(error: any) {
      showToast({
        toast,
        renderContent: () => (
          <Toast action="error" variant="accent">
            <VStack space="xs">
              <ToastDescription color="$red500">
                {error.response.message}
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      setLoading(false);
    },
  });

  const handleNavigateRegister = () => {
    navigation.navigate('Register');
  };

  const onSubmit: SubmitHandler<ILoginFormValues> = (data: any) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    loginMutation.mutate(user);
  };

  return {
    handleSubmit,
    showPassword,
    handleShowPassword,
    handleNavigateRegister,
    control,
    errors,
    onSubmit,
    isLoading,
  };
}
