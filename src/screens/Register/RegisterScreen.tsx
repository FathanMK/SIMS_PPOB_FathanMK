import {
  Box,
  Button,
  ButtonText,
  Image,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  ScrollView,
  Spinner,
  Text,
  View,
} from '@gluestack-ui/themed';
import {AtSignIcon, EyeIcon, LockIcon, UserIcon} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller} from 'react-hook-form';

import useRegister from './hooks/useRegister';

export default function RegisterScreen() {
  const {
    showPassword,
    handleShowPassword,
    handleNavigateLogin,
    control,
    watch,
    errors,
    handleSubmit,
    onSubmit,
    isLoading,
  } = useRegister();

  return (
    <View flex={1} as={SafeAreaView}>
      <ScrollView
        w="$full"
        contentContainerStyle={{
          paddingVertical: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
            Lengkapi data untuk membuat akun
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
            }}
            name="firstName"
            render={({field: {onChange, onBlur, value}}) => (
              <Box>
                <Input
                  borderColor={
                    errors.firstName ? '$primaryRed500' : 'rgba(0,0,0,0.3)'
                  }
                  size="xl">
                  <InputSlot pl="$4">
                    <InputIcon
                      as={UserIcon}
                      size="sm"
                      color="rgba(0,0,0,0.3)"
                    />
                  </InputSlot>
                  <InputField
                    size="sm"
                    inputMode="text"
                    fontWeight="600"
                    placeholder="nama depan"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
                <Box alignItems="flex-end" mt="$1" justifyContent="flex-end">
                  {errors.firstName && (
                    <Text color="$primaryRed500">
                      {errors.firstName.message}
                    </Text>
                  )}
                </Box>
              </Box>
            )}
          />
          <Controller
            control={control}
            rules={{
              required: 'tidak boleh kosong',
            }}
            name="lastName"
            render={({field: {onChange, onBlur, value}}) => (
              <Box>
                <Input
                  borderColor={
                    errors.lastName ? '$primaryRed500' : 'rgba(0,0,0,0.3)'
                  }
                  size="xl">
                  <InputSlot pl="$4">
                    <InputIcon
                      as={UserIcon}
                      size="sm"
                      color="rgba(0,0,0,0.3)"
                    />
                  </InputSlot>
                  <InputField
                    size="sm"
                    inputMode="text"
                    fontWeight="600"
                    placeholder="nama belakang"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
                <Box alignItems="flex-end" mt="$1" justifyContent="flex-end">
                  {errors.lastName && (
                    <Text color="$primaryRed500">
                      {errors.lastName.message}
                    </Text>
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
                    <InputIcon
                      as={LockIcon}
                      size="sm"
                      color="rgba(0,0,0,0.35)"
                    />
                  </InputSlot>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    size="sm"
                    fontWeight="600"
                    placeholder="buat password"
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
                    <Text color="$primaryRed500">
                      {errors.password.message}
                    </Text>
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
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'password tidak sama';
                }
              },
            }}
            name="confirmPassword"
            render={({field: {onChange, onBlur, value}}) => (
              <Box>
                <Input
                  borderColor={
                    errors.confirmPassword
                      ? '$primaryRed500'
                      : 'rgba(0,0,0,0.3)'
                  }
                  size="xl">
                  <InputSlot pl="$4">
                    <InputIcon
                      as={LockIcon}
                      size="sm"
                      color="rgba(0,0,0,0.35)"
                    />
                  </InputSlot>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    size="sm"
                    fontWeight="600"
                    placeholder="konfirmasi password"
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
                  {errors.confirmPassword && (
                    <Text color="$primaryRed500">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </Box>
              </Box>
            )}
          />
        </Box>
        <Box w="$5/6" my="$10">
          <Button
            isDisabled={isLoading}
            size="lg"
            bgColor="$primaryRed500"
            $active={{bgColor: '$primaryRed600'}}
            onPress={handleSubmit(onSubmit)}>
            {isLoading ? (
              <Spinner size="large" color="$white" />
            ) : (
              <ButtonText size="sm">Register</ButtonText>
            )}
          </Button>
        </Box>
        <Box>
          <Text>
            sudah punya akun? login{' '}
            <Text
              onPress={handleNavigateLogin}
              color="$primaryRed500"
              fontWeight="$bold">
              di sini
            </Text>
          </Text>
        </Box>
      </ScrollView>
    </View>
  );
}
