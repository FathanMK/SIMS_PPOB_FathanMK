import {HStack, Text} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';

export default function SaldoBanner() {
  return (
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
  );
}
