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
  Image,
  Button,
  ButtonText,
  Spinner,
  ButtonGroup,
} from '@gluestack-ui/themed';
import {ArrowLeftIcon, CheckIcon, WalletIcon} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageBackground} from 'react-native';
import {Controller} from 'react-hook-form';

import topUpServices from './data/topUpServices';
import useTopUp from './hooks/useTopUp';
import formatToIDR from '../../utils/formatToIDR';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
} from '../../components/AlertDialog/AlertDialog';

export default function TopUpScreen() {
  const {
    topUpWidth,
    handleBack,
    control,
    watch,
    errors,
    handleSubmit,
    onSubmit,
    balance,
    handleSetTopUp,
    isLoading,
    isAskDialog,
    handleAskDialog,
    isSuccessDialog,
    handleBackToHome,
  } = useTopUp();

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
              {formatToIDR(balance)}
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
          <Controller
            control={control}
            rules={{
              required: 'tidak boleh kosong',
              validate: value => {
                if (Number(value) < 10000) {
                  return 'minimum Rp 10.000';
                }
                if (Number(value) > 1000000) {
                  return 'maksimum Rp 1.000.000';
                }
              },
            }}
            name="topUp"
            render={({field: {onChange, onBlur, value}}) => (
              <Box>
                <Input
                  borderColor={
                    errors.topUp ? '$primaryRed500' : 'rgba(0,0,0,0.3)'
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
                    placeholder="masukan nominal top up"
                    maxLength={7}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
                <Box alignItems="flex-end" mt="$1" justifyContent="flex-end">
                  {errors.topUp && (
                    <Text color="$primaryRed500">{errors.topUp.message}</Text>
                  )}
                </Box>
              </Box>
            )}
          />
        </Box>
        <Box p="$6" gap="$2" flexDirection="row" flexWrap="wrap">
          {topUpServices.map((item: any) => (
            <Pressable
              key={item.top_up_id}
              p="$4"
              mt="$2"
              flexBasis={topUpWidth}
              alignItems="center"
              justifyContent="center"
              borderWidth="$1"
              borderColor={
                watch('topUp') === String(item.top_up_amount)
                  ? '$primaryRed500'
                  : 'rgba(0,0,0,0.3)'
              }
              onPress={() => handleSetTopUp(item.top_up_amount)}>
              <Text
                fontSize="$sm"
                color={
                  watch('topUp') === String(item.top_up_amount)
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
            isDisabled={
              watch('topUp').length <= 0 || errors.topUp || isLoading
                ? true
                : false
            }
            size="lg"
            bgColor="$primaryRed500"
            $active={{bgColor: '$primaryRed600'}}
            onPress={handleAskDialog}>
            <ButtonText size="sm">Top Up</ButtonText>
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
            Anda yakin untuk Top Up sebesar
          </Text>
          <Text size="xl" fontWeight="$black" my="$2">
            {formatToIDR(Number(watch('topUp')))}
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
            {formatToIDR(Number(watch('topUp')))}
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
    </View>
  );
}
