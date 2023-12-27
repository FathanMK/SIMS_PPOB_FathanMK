import {
  ScrollView,
  Text,
  View,
  Box,
  Image,
  Pressable,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AtSignIcon, PencilIcon, UserIcon} from 'lucide-react-native';
import {Controller} from 'react-hook-form';

import Header from '../../components/Header/Header';
import useAccount from './hooks/useAccount';

export default function AccountScreen() {
  const {
    control,
    errors,
    user,
    handleOpenGallery,
    imageFile,
    isEditMode,
    handleEditMode,
    handleUpdateProfile,
  } = useAccount();
  return (
    <View flex={1} as={SafeAreaView}>
      <Header headerTitle="Account" />
      <ScrollView>
        <Box mt="$6" alignItems="center" justifyContent="center">
          <Box position="relative">
            <Image
              role="img"
              alt="profile-picture"
              size="xl"
              rounded="$full"
              source={{
                uri: user.profile_image.includes('null')
                  ? 'https://res.cloudinary.com/dts5hyzdq/image/upload/v1703410487/_SIMS_PPOB_FathanMK/qraer7awg7likrdnu4ke.png'
                  : imageFile
                  ? imageFile.uri
                  : user.profile_image,
              }}
            />
            {isEditMode && (
              <Pressable
                position="absolute"
                bottom={0}
                right={0}
                bgColor="$white"
                borderWidth="$1"
                borderColor="rgba(0,0,0,0.3)"
                rounded="$full"
                h="$8"
                w="$8"
                alignItems="center"
                justifyContent="center"
                onPress={handleOpenGallery}>
                <PencilIcon size={16} color="black" />
              </Pressable>
            )}
          </Box>
          <Text fontSize="$2xl" lineHeight="$2xl" fontWeight="$bold" my="$4">
            {`${user.first_name} ${user.last_name}`}
          </Text>
        </Box>
        <Box my="$10" px="$6" gap="$6">
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
                <Text mb="$2" fontWeight="$bold">
                  Email
                </Text>
                <Input
                  isDisabled={!isEditMode}
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
                    <Text color="$primaryRed500">
                      {errors.email.message as string}
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
            name="firstName"
            render={({field: {onChange, onBlur, value}}) => (
              <Box>
                <Text mb="$2" fontWeight="$bold">
                  Nama Depan
                </Text>
                <Input
                  isDisabled={!isEditMode}
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
                      {errors.firstName.message as string}
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
                <Text mb="$2" fontWeight="$bold">
                  Nama Belakang
                </Text>
                <Input
                  isDisabled={!isEditMode}
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
                      {errors.lastName.message as string}
                    </Text>
                  )}
                </Box>
              </Box>
            )}
          />
        </Box>
        <Box px="$6" my="$10">
          <Button
            mb="$6"
            size="xl"
            bgColor="$primaryRed500"
            onPress={handleEditMode}>
            <ButtonText fontSize="$sm">
              {isEditMode ? 'Simpan' : 'Edit Profile'}
            </ButtonText>
          </Button>
          <Button
            size="xl"
            borderWidth="$2"
            bgColor="transparent"
            borderColor="$primaryRed500"
            onPress={() => {
              if (isEditMode) {
                handleEditMode();
                return;
              } else {
                console.log('logout');
              }
            }}>
            <ButtonText fontSize="$sm" color="$primaryRed500">
              {isEditMode ? 'Batalkan' : 'Logout'}
            </ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </View>
  );
}
