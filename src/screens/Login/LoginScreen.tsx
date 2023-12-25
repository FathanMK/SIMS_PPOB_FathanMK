import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Image,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  View,
} from '@gluestack-ui/themed';
import {AtSignIcon, EyeIcon, LockIcon} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useLogin from './hooks/useLogin';

export default function LoginScreen() {
  const {
    showPassword,
    handleShowPassword,
    email,
    password,
    handleSubmit,
    handleNavigateRegister,
  } = useLogin();

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      as={SafeAreaView}>
      <Box flexDirection="row" alignItems="center" gap="$2">
        <Image
          w="$6"
          h="$6"
          alt="SIMS PPOB logo small"
          role="img"
          source={{
            uri: 'https://res.cloudinary.com/dts5hyzdq/image/upload/v1703410487/_SIMS_PPOB_FathanMK/uuopppnbasmfvqqiq4jk.png',
          }}
        />
        <Text fontWeight="$bold" fontSize="$xl">
          SIMS PPOB
        </Text>
      </Box>
      <Box w="$5/6" py="$4" px="$5" mt="$4" mb="$10">
        <Text
          textAlign="center"
          fontWeight="$bold"
          fontSize="$2xl"
          lineHeight="$2xl">
          Masuk atau buat akun untuk memulai
        </Text>
      </Box>
      <Box gap="$4" w="$5/6">
        <FormControl isInvalid={email.validation.length > 0}>
          <Input size="xl">
            <InputSlot pl="$4">
              <InputIcon as={AtSignIcon} size="sm" color="rgba(0,0,0,0.35)" />
            </InputSlot>
            <InputField
              size="sm"
              inputMode="email"
              fontWeight="600"
              placeholder="masukan email anda"
              onChangeText={email.setValue}
            />
          </Input>
          <FormControlError justifyContent="flex-end">
            {email.validation && (
              <FormControlErrorText>{email.validation}</FormControlErrorText>
            )}
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={password.validation.length > 0}>
          <Input size="xl">
            <InputSlot pl="$4">
              <InputIcon as={LockIcon} size="sm" color="rgba(0,0,0,0.35)" />
            </InputSlot>
            <InputField
              type={showPassword ? 'text' : 'password'}
              size="sm"
              fontWeight="600"
              placeholder="masukan password anda"
              onChangeText={password.setValue}
            />
            <InputSlot pr="$4" onPress={handleShowPassword}>
              <InputIcon
                as={EyeIcon}
                size="sm"
                color={showPassword ? '$green' : '$primaryRed500'}
              />
            </InputSlot>
          </Input>
          <FormControlError justifyContent="flex-end">
            {password.validation && (
              <FormControlErrorText>{password.validation}</FormControlErrorText>
            )}
          </FormControlError>
        </FormControl>
      </Box>
      <Box w="$5/6" my="$10">
        <Button
          size="lg"
          bgColor="$primaryRed500"
          $active={{bgColor: '$primaryRed600'}}
          onPress={handleSubmit}>
          <ButtonText size="sm">Masuk</ButtonText>
        </Button>
      </Box>
      <Box>
        <Text>
          belum punya akun? registrasi{' '}
          <Text
            onPress={handleNavigateRegister}
            color="$primaryRed500"
            fontWeight="$bold">
            di sini
          </Text>
        </Text>
      </Box>
    </View>
  );
}
