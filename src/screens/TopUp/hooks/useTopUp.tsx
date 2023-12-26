import {useAppNavigation} from '../../../hooks';
import {useWindowDimensions} from 'react-native';
import useInput from '../../../hooks/useInput';

export default function useTopUp() {
  const {width} = useWindowDimensions();
  const navigation = useAppNavigation();
  const topUp = useInput('');

  const topUpWidth = width * 0.3 - 8;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTopUp = (amount: string) => {
    topUp.setValue(amount);
  };

  const validateTopUp = () => {
    if (topUp.value.length < 5) {
      topUp.setValidation('minimal transaksi: 10.000');
    } else if (topUp.value.length > 7) {
      topUp.setValidation('maksimal transaksi: 1.000.000');
    } else {
      topUp.setValidation('');
    }
  };

  return {
    topUpWidth,
    handleBack,
    topUp,
    handleTopUp,
  };
}
