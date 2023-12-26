import {Box, Pressable, HStack, Text} from '@gluestack-ui/themed';
import {ArrowLeftIcon} from 'lucide-react-native';
import {useAppNavigation} from '../../hooks';

interface IHeaderProps {
  headerTitle: string;
}

export default function Header({headerTitle}: IHeaderProps) {
  const navigation = useAppNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Box p="$6" flexDirection="row" justifyContent="space-between">
      <Pressable onPress={handleBack}>
        <HStack space="xs" alignItems="center">
          <ArrowLeftIcon fontSize="bold" size={18} color="black" />
          <Text pb="$px" fontSize="$sm" fontWeight="$bold">
            Kembali
          </Text>
        </HStack>
      </Pressable>
      <Text fontWeight="$black" fontSize="$xl">
        {headerTitle}
      </Text>
      <Pressable opacity={0}>
        <HStack space="xs">
          <ArrowLeftIcon fontSize="bold" size={18} color="black" />
          <Text pb="$px" fontSize="$sm" fontWeight="$bold">
            Kembali
          </Text>
        </HStack>
      </Pressable>
    </Box>
  );
}
