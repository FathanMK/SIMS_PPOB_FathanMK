import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';

import {axiosInstanceWAuth} from '../../../utils/axiosInstances';
import useAppSelector from '../../../hooks/useAppSelector';
import {useAppNavigation} from '../../../hooks';

export default function useHome() {
  const [showBalance, setShowBalance] = useState(false);
  const navigation = useAppNavigation();
  const {user, token, balance} = useAppSelector(state => state.user);

  const {data: bannersData, isLoading: bannersLoading} = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const res = await axiosInstanceWAuth(token).get('/banner');
      const {data} = res.data;
      return data;
    },
  });

  const {data: servicesData, isLoading: servicesLoading} = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosInstanceWAuth(token).get('/services');
      const {data} = res.data;
      return data;
    },
  });

  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  const handleNavigatePembayaran = (item: any) => {
    navigation.navigate('Payment', {
      ...item,
    });
  };

  return {
    user,
    balance,
    showBalance,
    handleShowBalance,
    bannersData,
    bannersLoading,
    servicesData,
    servicesLoading,
    handleNavigatePembayaran,
  };
}
