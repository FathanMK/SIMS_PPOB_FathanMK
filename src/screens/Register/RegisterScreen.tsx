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
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import {AtSignIcon, EyeIcon, LockIcon, UserIcon} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useRegister from './hooks/useRegister';

export default function RegisterScreen() {
  const {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    showPassword,
    handleShowPassword,
    handleSubmit,
    handleNavigateLogin,
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
          <FormControl isInvalid={email.validation.length > 0}>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={AtSignIcon} size="sm" color="rgba(0,0,0,0.3)" />
              </InputSlot>
              <InputField
                size="sm"
                inputMode="email"
                fontWeight="600"
                placeholderTextColor="rgba(0,0,0,0.3)"
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
          <FormControl isInvalid={firstName.validation.length > 0}>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={UserIcon} size="sm" color="rgba(0,0,0,0.3)" />
              </InputSlot>
              <InputField
                size="sm"
                inputMode="text"
                fontWeight="600"
                placeholderTextColor="rgba(0,0,0,0.3)"
                placeholder="nama depan"
                onChangeText={firstName.setValue}
              />
            </Input>
            <FormControlError justifyContent="flex-end">
              {firstName.validation && (
                <FormControlErrorText>
                  {firstName.validation}
                </FormControlErrorText>
              )}
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={lastName.validation.length > 0}>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={UserIcon} size="sm" color="rgba(0,0,0,0.3)" />
              </InputSlot>
              <InputField
                size="sm"
                inputMode="text"
                fontWeight="600"
                placeholderTextColor="rgba(0,0,0,0.3)"
                placeholder="nama belakang"
                onChangeText={lastName.setValue}
              />
            </Input>
            <FormControlError justifyContent="flex-end">
              {lastName.validation && (
                <FormControlErrorText>
                  {lastName.validation}
                </FormControlErrorText>
              )}
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={password.validation.length > 0}>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={LockIcon} size="sm" color="rgba(0,0,0,0.3)" />
              </InputSlot>
              <InputField
                type={showPassword ? 'text' : 'password'}
                size="sm"
                placeholder="buat password"
                fontWeight="600"
                placeholderTextColor="rgba(0,0,0,0.3)"
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
                <FormControlErrorText>
                  {password.validation}
                </FormControlErrorText>
              )}
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={confirmPassword.validation.length > 0}>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={LockIcon} size="sm" color="rgba(0,0,0,0.3)" />
              </InputSlot>
              <InputField
                type={showPassword ? 'text' : 'password'}
                size="sm"
                placeholder="konfirmasi password"
                fontWeight="600"
                placeholderTextColor="rgba(0,0,0,0.3)"
                onChangeText={confirmPassword.setValue}
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
              {confirmPassword.validation && (
                <FormControlErrorText>
                  {confirmPassword.validation}
                </FormControlErrorText>
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
