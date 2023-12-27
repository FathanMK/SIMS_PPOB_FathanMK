import {useQuery} from '@tanstack/react-query';
import useAppSelector from '../../../hooks/useAppSelector';
import {axiosInstanceWAuth} from '../../../utils/axiosInstances';
import {useState} from 'react';

export default function useTransaction() {
  const {token} = useAppSelector(state => state.user);
  const [transactionOffset, setTransactionOffset] = useState(0);
  const {data: transactionsData, isLoading: transactionsLoading} = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await axiosInstanceWAuth(token).get(
        `/transaction/history?offset=${transactionOffset}&limit=5`,
      );
      const {data} = res.data;

      return data.records;
    },
  });

  return {transactionsData, transactionsLoading};
}
