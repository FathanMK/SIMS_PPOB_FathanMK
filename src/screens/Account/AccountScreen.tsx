import {
  ScrollView,
  Text,
  View,
  Box,
  Image,
  Pressable,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import {AtSignIcon, PencilIcon, UserIcon} from 'lucide-react-native';

export default function AccountScreen() {
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
              source={{
                uri: 'https://res.cloudinary.com/dts5hyzdq/image/upload/v1703410487/_SIMS_PPOB_FathanMK/qraer7awg7likrdnu4ke.png',
              }}
            />
            <Pressable
              position="absolute"
              bottom={0}
              right={0}
              borderWidth="$1"
              borderColor="rgba(0,0,0,0.3)"
              rounded="$full"
              h="$8"
              w="$8"
              alignItems="center"
              justifyContent="center">
              <PencilIcon size={16} color="black" />
            </Pressable>
          </Box>
          <Text fontSize="$2xl" lineHeight="$2xl" fontWeight="$bold" my="$4">
            Kristanto Wibowo
          </Text>
        </Box>
        <Box my="$10" px="$6" gap="$6">
          <FormControl>
            <FormControlLabel mb="$4">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={AtSignIcon} size="sm" color="rgba(0,0,0,0.35)" />
              </InputSlot>
              <InputField />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel mb="$4">
              <FormControlLabelText>Nama Depan</FormControlLabelText>
            </FormControlLabel>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={UserIcon} size="sm" color="rgba(0,0,0,0.35)" />
              </InputSlot>
              <InputField />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel mb="$4">
              <FormControlLabelText>Nama Belakang</FormControlLabelText>
            </FormControlLabel>
            <Input size="xl">
              <InputSlot pl="$4">
                <InputIcon as={UserIcon} size="sm" color="rgba(0,0,0,0.35)" />
              </InputSlot>
              <InputField />
            </Input>
          </FormControl>
        </Box>
        <Box px="$6" my="$10">
          <Button mb="$6" size="xl" bgColor="$primaryRed500">
            <ButtonText fontSize="$sm">Edit Profile</ButtonText>
          </Button>
          <Button
            size="xl"
            borderWidth="$2"
            bgColor="transparent"
            borderColor="$primaryRed500">
            <ButtonText fontSize="$sm" color="$primaryRed500">
              Logout
            </ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </View>
  );
}
