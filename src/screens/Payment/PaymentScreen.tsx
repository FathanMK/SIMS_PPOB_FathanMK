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
  ButtonGroup,
  Spinner,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageBackground} from 'react-native';
import {CheckIcon, WalletIcon, XIcon} from 'lucide-react-native';
import {Controller} from 'react-hook-form';

import Header from '../../components/Header/Header';
import formatToIDR from '../../utils/formatToIDR';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
} from '../../components/AlertDialog/AlertDialog';
import usePayment from './hooks/usePayment';
import {useEffect} from 'react';

export default function PaymentScreen({route}: {route: any}) {
  const {params} = route;
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    balance,
    isAskDialog,
    handleAskDialog,
    isLoading,
    onSubmit,
    isSuccessDialog,
    handleBackToHome,
  } = usePayment();

  useEffect(() => {
    setValue('tariff', String(params.service_tariff), {shouldValidate: true});
    setValue('code', String(params.service_code));
  }, [params]);

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
              {formatToIDR(balance)}
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
              alt={`${params.service_name}-logo`}
              source={{uri: params.service_icon}}
            />
            <Text>{params.service_name}</Text>
          </Box>
          <Controller
            control={control}
            rules={{
              validate: value => {
                if (balance < Number(value)) {
                  return 'saldo kurang';
                }
              },
            }}
            name="tariff"
            render={({field: {onChange, onBlur, value}}) => (
              <Box my="$4">
                <Input
                  isDisabled
                  borderColor={
                    errors.tariff ? '$primaryRed500' : 'rgba(0,0,0,0.3)'
                  }
                  size="xl">
                  <InputSlot pl="$4">
                    <InputIcon
                      as={WalletIcon}
                      size="sm"
                      color="rgba(0,0,0,0.35)"
                    />
                  </InputSlot>
                  <InputField
                    type="text"
                    size="sm"
                    fontWeight="600"
                    placeholder="harga service"
                    maxLength={7}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
                <Box alignItems="flex-end" mt="$1" justifyContent="flex-end">
                  {errors.tariff && (
                    <Text color="$primaryRed500">{errors.tariff.message}</Text>
                  )}
                </Box>
              </Box>
            )}
          />
        </Box>
        <Box px="$6" my="$10">
          <Button
            isDisabled={errors.tariff ? true : false}
            size="lg"
            bgColor="$primaryRed500"
            $active={{bgColor: '$primaryRed600'}}
            onPress={handleAskDialog}>
            <ButtonText size="sm">Bayar</ButtonText>
          </Button>
        </Box>
      </ScrollView>
      <AlertDialog isOpen={isAskDialog}>
        <AlertDialogBody>
          <Image
            my="$4"
            role="img"
            alt="logo"
            h="$16"
            w="$16"
            source={{
              uri: 'https://res.cloudinary.com/dts5hyzdq/image/upload/v1703410487/_SIMS_PPOB_FathanMK/uuopppnbasmfvqqiq4jk.png',
            }}
          />
          <Text fontWeight="$medium" size="sm">
            Beli {params.service_name} senilai
          </Text>
          <Text size="xl" fontWeight="$black" my="$2">
            {formatToIDR(params.service_tariff)}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            space="sm">
            <Button
              isDisabled={isLoading}
              bg="$primaryRed500"
              action="positive"
              onPress={handleSubmit(onSubmit)}>
              {isLoading ? (
                <Spinner color="$white" />
              ) : (
                <ButtonText>Ya, Lanjutkan</ButtonText>
              )}
            </Button>
            <Button
              isDisabled={isLoading}
              borderColor="$primaryRed500"
              variant="outline"
              action="negative"
              onPress={handleAskDialog}>
              <ButtonText>Batalkan</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialog>
      <AlertDialog isOpen={isSuccessDialog}>
        <AlertDialogBody>
          <Box
            my="$4"
            h="$16"
            w="$16"
            rounded="$full"
            alignItems="center"
            justifyContent="center"
            bgColor="$green500">
            <CheckIcon size={40} color="white" />
          </Box>
          <Text fontWeight="$medium" size="sm">
            Top Up sebesar
          </Text>
          <Text size="xl" fontWeight="$black" my="$2">
            {formatToIDR(params.service_tariff)}
          </Text>
          <Text fontWeight="$medium" size="sm">
            Berhasil
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            space="sm">
            <Button
              borderColor="$primaryRed500"
              variant="outline"
              action="negative"
              onPress={handleBackToHome}>
              <ButtonText>Kembali ke beranda</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialog>
      <AlertDialog isOpen={false}>
        <AlertDialogBody>
          <Box
            my="$4"
            h="$16"
            w="$16"
            rounded="$full"
            alignItems="center"
            justifyContent="center"
            bgColor="$red500">
            <XIcon size={40} color="white" />
          </Box>
          <Text fontWeight="$medium" size="sm">
            Pembayaran {params.service_name} sebesar
          </Text>
          <Text size="xl" fontWeight="$black" my="$2">
            {formatToIDR(params.service_tariff)}
          </Text>
          <Text fontWeight="$medium" size="sm">
            Gagal
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            space="sm">
            <Button
              borderColor="$primaryRed500"
              variant="outline"
              action="negative"
              onPress={handleBackToHome}>
              <ButtonText>Kembali ke beranda</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialog>
    </View>
  );
}
