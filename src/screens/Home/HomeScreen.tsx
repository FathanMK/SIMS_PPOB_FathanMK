import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@gluestack-ui/themed';
import {ImageBackground} from 'react-native';
import {EyeIcon} from 'lucide-react-native';

import localServices from './data/services';
import localBanners from './data/banners';

export default function HomeScreen() {
  return (
    <View flex={1} as={SafeAreaView}>
      <ScrollView>
        <Box
          py="$10"
          px="$6"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <HStack space="xs" alignItems="center">
            <Image
              alt="small logo"
              role="img"
              h="$6"
              w="$6"
              source={{
                uri: 'https://res.cloudinary.com/dts5hyzdq/image/upload/v1703410487/_SIMS_PPOB_FathanMK/uuopppnbasmfvqqiq4jk.png',
              }}
            />
            <Text fontSize="$sm" fontWeight="$bold">
              SIMS PPOB
            </Text>
          </HStack>
          <Pressable>
            <Image
              alt="profile picture"
              role="img"
              h="$8"
              w="$8"
              source={{
                uri: 'https://res.cloudinary.com/dts5hyzdq/image/upload/v1703410487/_SIMS_PPOB_FathanMK/qraer7awg7likrdnu4ke.png',
              }}
            />
          </Pressable>
        </Box>
        <Box px="$6">
          <Text fontSize="$xl" lineHeight="$xl" fontWeight="$medium">
            Selamat Datang,
          </Text>
          <Text fontSize="$2xl" lineHeight="$2xl" fontWeight="$bold">
            Kristanto Wibowo
          </Text>
        </Box>
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
              Rp
            </Text>
            <Text
              color="$white"
              fontWeight="$black"
              fontSize="$4xl"
              lineHeight="$5xl">
              •••••••
            </Text>
          </HStack>
          <HStack space="sm" alignItems="center">
            <Text color="$white" fontSize="$sm">
              Lihat Saldo
            </Text>
            <EyeIcon color="white" size={14} />
          </HStack>
        </ImageBackground>
        <Box px="$6" flexDirection="row" flexWrap="wrap">
          {localServices.map(item => (
            <Pressable
              key={item.service_code}
              mt="$6"
              flexBasis="$1/6"
              alignItems="center">
              <Image
                w="$12"
                h="$12"
                role="img"
                alt={`${item.service_name}`}
                source={{uri: item.service_icon}}
              />
              <Text fontSize="$xs" fontWeight="$medium">
                {item.service_name
                  .replace('Pajak', '')
                  .replace('Berlangganan', '')
                  .replace('Voucher', '')
                  .replace('Paket', '')}
              </Text>
            </Pressable>
          ))}
        </Box>
        <Box p="$6">
          <Text fontWeight="$bold">Temukan promo menarik</Text>
          <Box py="$6">
            <FlatList
              horizontal
              data={localBanners}
              renderItem={({item}: {item: any}) => (
                <Pressable width="$80">
                  <Image
                    h="$32"
                    w="$72"
                    role="img"
                    alt={`${item.banner_name}-banner`}
                    source={{uri: item.banner_image}}
                  />
                </Pressable>
              )}
            />
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}
