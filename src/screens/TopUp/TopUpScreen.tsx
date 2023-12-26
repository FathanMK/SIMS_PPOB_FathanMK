import {
  Box,
  ScrollView,
  Text,
  Pressable,
  View,
  HStack,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {ArrowLeftIcon, WalletIcon} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageBackground} from 'react-native';

import topUpServices from './data/topUpServices';
import useTopUp from './hooks/useTopUp';
import formatToIDR from '../../utils/formatToIDR';

export default function TopUpScreen() {
  const {topUpWidth, handleBack, topUp, handleTopUp} = useTopUp();
  return (
    <View flex={1} as={SafeAreaView}>
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
          Top Up
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
        <Box px="$6" py="$12">
          <Text fontSize="$xl" lineHeight="$xl" fontWeight="$medium">
            Silahkan masukan,
          </Text>
          <Text fontSize="$2xl" lineHeight="$2xl" fontWeight="$bold">
            nominal Top Up
          </Text>
        </Box>
        <Box px="$6">
          <FormControl>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={WalletIcon} size="sm" color="rgba(0,0,0,0.35)" />
              </InputSlot>
              <InputField
                size="sm"
                inputMode="numeric"
                fontWeight="600"
                maxLength={7}
                placeholder="masukan nominal Top Up"
                onChangeText={topUp.setValue}
                value={String(topUp.value)}
              />
            </Input>
            <FormControlError justifyContent="flex-end">
              {topUp.validation && (
                <FormControlErrorText>{topUp.validation}</FormControlErrorText>
              )}
            </FormControlError>
          </FormControl>
        </Box>
        <Box p="$6" gap="$2" flexDirection="row" flexWrap="wrap">
          {topUpServices.map(item => (
            <Pressable
              key={item.top_up_id}
              p="$4"
              mt="$2"
              flexBasis={topUpWidth}
              alignItems="center"
              justifyContent="center"
              borderWidth="$1"
              borderColor={
                Number(topUp.value) === item.top_up_amount
                  ? '$primaryRed500'
                  : 'rgba(0,0,0,0.3)'
              }
              onPress={() => handleTopUp(String(item.top_up_amount))}>
              <Text
                fontSize="$sm"
                color={
                  Number(topUp.value) === item.top_up_amount
                    ? '$primaryRed500'
                    : 'rgba(0,0,0,0.5)'
                }>
                {formatToIDR(item.top_up_amount)}
              </Text>
            </Pressable>
          ))}
        </Box>
        <Box px="$6" my="$10">
          <Button
            isDisabled={topUp.value.length <= 0}
            size="lg"
            bgColor="$primaryRed500"
            $active={{bgColor: '$primaryRed600'}}>
            <ButtonText size="sm">Top Up</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </View>
  );
}
