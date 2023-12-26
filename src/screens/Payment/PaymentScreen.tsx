import {
  Box,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageBackground} from 'react-native';
import {WalletIcon} from 'lucide-react-native';

import Header from '../../components/Header/Header';
import localServices from '../Home/data/services';

export default function PaymentScreen() {
  return (
    <View flex={1} as={SafeAreaView}>
      <Header headerTitle="Pembayaran" />
      <ScrollView>
        <ImageBackground
          style={{margin: 20, paddingVertical: 20, paddingHorizontal: 25}}
          imageStyle={{borderRadius: 10}}
          resizeMode="cover"
          source={{
            uri: 'https://res.cloudinary.com/dts5hyzdq/image/upload/v1703410488/_SIMS_PPOB_FathanMK/vsl8r7vut68eqeuafvf0.png',
          }}>
          <Text color="$white" fontWeight="$medium" fontSize="$lg">
            Saldo anda
          </Text>
          <HStack space="sm" alignItems="center">
            <Text
              color="$white"
              fontWeight="$black"
              fontSize="$3xl"
              lineHeight="$3xl">
              Rp 0
            </Text>
          </HStack>
        </ImageBackground>
        <Box px="$6">
          <Text my="$4" fontWeight="$medium">
            Pembayaran
          </Text>
          <Box flexDirection="row" gap="$2" alignItems="center">
            <Image
              w="$10"
              h="$10"
              role="img"
              alt={`${localServices[0].service_name}-logo`}
              source={{uri: localServices[0].service_icon}}
            />
            <Text>{localServices[0].service_name}</Text>
          </Box>
          <Input my="$4" size="xl">
            <InputSlot pl="$4">
              <InputIcon as={WalletIcon} size="sm" color="rgba(0,0,0,0.35)" />
            </InputSlot>
            <InputField
              size="sm"
              inputMode="numeric"
              fontWeight="600"
              maxLength={7}
              placeholder="masukan nominal Top Up"
              value="10000"
            />
          </Input>
        </Box>
        <Box px="$6" my="$10">
          <Button
            size="lg"
            bgColor="$primaryRed500"
            $active={{bgColor: '$primaryRed600'}}>
            <ButtonText size="sm">Bayar</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </View>
  );
}
