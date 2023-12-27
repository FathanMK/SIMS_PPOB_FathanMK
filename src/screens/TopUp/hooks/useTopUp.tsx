import {useWindowDimensions} from 'react-native';
import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {Toast, VStack, ToastDescription, useToast} from '@gluestack-ui/themed';

import {useAppNavigation} from '../../../hooks';
import useAppSelector from '../../../hooks/useAppSelector';
import {axiosInstanceWAuth} from '../../../utils/axiosInstances';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {setBalance} from '../../../slices/user/userSlice';
import showToast from '../../../utils/showToast/showToast';

export default function useTopUp() {
  const {width} = useWindowDimensions();
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [isAskDialog, setAskDialogOpen] = useState(false);
  const [isSuccessDialog, setSuccessDialogOpen] = useState(false);
  const navigation = useAppNavigation();
  const {balance, token} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      topUp: '',
    },
    mode: 'onChange',
  });
  const topUpMutation = useMutation({
    mutationFn: (amount: number) => {
      setLoading(true);
      return axiosInstanceWAuth(token).post('/topup', {
        top_up_amount: amount,
      });
    },
    onSuccess: async () => {
      await axiosInstanceWAuth(token)
        .get('/balance')
        .then(response => {
          const {data} = response.data;
          dispatch(setBalance(data.balance));
          setAskDialogOpen(false);
          setSuccessDialogOpen(true);
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

  const topUpWidth = width * 0.3 - 8;

  const onSubmit = (data: any) => {
    const amount = Number(data.topUp);
    topUpMutation.mutate(amount);
  };

  const handleSetTopUp = (amount: number) => {
    setValue('topUp', String(amount), {shouldValidate: true});
  };

  const handleAskDialog = () => {
    setAskDialogOpen(!isAskDialog);
  };

  const handleSuccessDialog = () => {
    setSuccessDialogOpen(!isSuccessDialog);
  };

  const handleBackToHome = () => {
    handleSuccessDialog();
    reset({topUp: ''});
    navigation.navigate('HomeScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return {
    topUpWidth,
    handleBack,
    handleSetTopUp,
    control,
    watch,
    errors,
    handleSubmit,
    onSubmit,
    balance,
    isLoading,
    isAskDialog,
    handleAskDialog,
    isSuccessDialog,
    handleSuccessDialog,
    handleBackToHome,
  };
}
