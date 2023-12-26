import {useAppNavigation} from '../../../hooks';
import {useWindowDimensions} from 'react-native';

export default function useTopUp() {
  const {width} = useWindowDimensions();
  const navigation = useAppNavigation();

  const topUpWidth = width * 0.3 - 8;

  const handleBack = () => {
    navigation.goBack();
  };

  return {
    topUpWidth,
    handleBack,
  };
}
