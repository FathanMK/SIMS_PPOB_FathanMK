import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {axiosInstanceWAuth} from '../../../utils/axiosInstances';
import useAppSelector from '../../../hooks/useAppSelector';
import {useAppNavigation} from '../../../hooks';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {setBalance} from '../../../slices/user/userSlice';

export default function usePayment() {
  const {token, balance} = useAppSelector(state => state.user);
  const [isAskDialog, setAskDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessDialog, setSuccessDialogOpen] = useState(false);
  const [isFailedDialog, setFailedDialogOpen] = useState(false);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      tariff: '',
      code: '',
    },
  });
  const transactionMutation = useMutation({
    mutationFn: (code: string) => {
      setIsLoading(true);
      return axiosInstanceWAuth(token).post('/transaction', {
        service_code: code,
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
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    },
    onError() {
      setFailedDialogOpen(true);
      setIsLoading(false);
    },
  });

  const handleAskDialog = () => {
    setAskDialogOpen(!isAskDialog);
  };

  const handleSuccessDialog = () => {
    setSuccessDialogOpen(!isSuccessDialog);
  };

  const handleFailedDialog = () => {
    setFailedDialogOpen(!isFailedDialog);
  };

  const onSubmit = (data: any) => {
    const service_code = data.code;
    transactionMutation.mutate(service_code);
  };

  const handleBackToHome = () => {
    handleSuccessDialog();
    navigation.navigate('HomeScreen');
  };

  return {
    control,
    handleSubmit,
    setValue,
    errors,
    balance,
    isLoading,
    isAskDialog,
    handleAskDialog,
    isSuccessDialog,
    handleSuccessDialog,
    isFailedDialog,
    handleFailedDialog,
    handleBackToHome,
    onSubmit,
  };
}
