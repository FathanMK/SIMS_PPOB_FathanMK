import {
  Box,
  Button,
  ButtonText,
  Image,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  View,
  Spinner,
} from '@gluestack-ui/themed';
import {AtSignIcon, EyeIcon, LockIcon} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useLogin from './hooks/useLogin';
import {Controller} from 'react-hook-form';

export default function LoginScreen() {
  const {
    showPassword,
    handleShowPassword,
    handleNavigateRegister,
    control,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
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
        <Controller
          control={control}
          rules={{
            required: 'tidak boleh kosong',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'cek email kembali',
            },
          }}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <Box>
              <Input
                borderColor={
                  errors.email ? '$primaryRed500' : 'rgba(0,0,0,0.3)'
                }
                size="xl">
                <InputSlot pl="$4">
                  <InputIcon
                    as={AtSignIcon}
                    size="sm"
                    color="rgba(0,0,0,0.35)"
                  />
                </InputSlot>
                <InputField
                  size="sm"
                  inputMode="email"
                  fontWeight="600"
                  placeholder="masukan email anda"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
              <Box alignItems="flex-end" mt="$1" justifyContent="flex-end">
                {errors.email && (
                  <Text color="$primaryRed500">{errors.email.message}</Text>
                )}
              </Box>
            </Box>
          )}
        />
        <Controller
          control={control}
          rules={{
            required: 'tidak boleh kosong',
            minLength: {
              value: 8,
              message: 'minimal 8 karakter',
            },
          }}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <Box>
              <Input
                borderColor={
                  errors.password ? '$primaryRed500' : 'rgba(0,0,0,0.3)'
                }
                size="xl">
                <InputSlot pl="$4">
                  <InputIcon as={LockIcon} size="sm" color="rgba(0,0,0,0.35)" />
                </InputSlot>
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  size="sm"
                  fontWeight="600"
                  placeholder="masukan password anda"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <InputSlot pr="$4" onPress={handleShowPassword}>
                  <InputIcon
                    as={EyeIcon}
                    size="sm"
                    color={showPassword ? '$green' : '$primaryRed500'}
                  />
                </InputSlot>
              </Input>
              <Box alignItems="flex-end" mt="$1" justifyContent="flex-end">
                {errors.password && (
                  <Text color="$primaryRed500">{errors.password.message}</Text>
                )}
              </Box>
            </Box>
          )}
        />
      </Box>
      <Box w="$5/6" my="$10">
        <Button
          size="lg"
          bgColor="$primaryRed500"
          $active={{bgColor: '$primaryRed600'}}
          onPress={handleSubmit(onSubmit)}>
          {isLoading ? (
            <Spinner size="large" color="$white" />
          ) : (
            <ButtonText size="sm">Masuk</ButtonText>
          )}
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
