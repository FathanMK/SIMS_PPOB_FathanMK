import {
  ScrollView,
  Text,
  View,
  Box,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import SaldoBanner from '../../components/SaldoBanner/SaldoBanner';
import formatToIDR from '../../utils/formatToIDR';

export default function TransactionScreen() {
  return (
    <View as={SafeAreaView}>
      <Header headerTitle="Transaction" />
      <ScrollView>
        <SaldoBanner />
        <Box px="$6">
          <Text fontSize="$lg" fontWeight="$bold">
            Transaksi
          </Text>
          {/* <Box h="$40" alignItems="center" justifyContent="flex-end">
            <Text>Maaf tidak ada histori transaksi saat ini</Text>
          </Box> */}
          <Box w="$full" py="$8">
            <Box
              px="$4"
              py="$3"
              borderWidth="$1"
              borderColor="rgba(0,0,0,0.3)"
              rounded="$lg">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Text
                  color="$green500"
                  fontWeight="$semibold"
                  fontSize="$2xl"
                  lineHeight="$2xl">
                  + {formatToIDR(10000)}
                </Text>
                <Text fontSize="$sm" fontWeight="$bold">
                  Top Up Saldo
                </Text>
              </Box>
              <Text mt="$2" fontSize="$xs" color="rgba(0,0,0,0.45)">
                17 August 2023 13:10 WIB
              </Text>
            </Box>
            <Button my="$4" bgColor="transparent">
              <ButtonText color="$primaryRed500">Show More</ButtonText>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}
