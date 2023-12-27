import {
  ScrollView,
  Text,
  View,
  Box,
  Button,
  ButtonText,
  Spinner,
} from '@gluestack-ui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';
import SaldoBanner from '../../components/SaldoBanner/SaldoBanner';
import useTransaction from './hooks/useTransaction';
import TransactionBox from './components/TransactionBox/TransactionBox';

export default function TransactionScreen() {
  const {transactionsData, transactionsLoading} = useTransaction();
  return (
    <View flex={1} as={SafeAreaView}>
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
          <Box w="$full" py="$8" gap="$8">
            {transactionsLoading ? (
              <Spinner size="large" color="$primaryRed500" />
            ) : (
              transactionsData.map((item: any) => (
                <TransactionBox
                  key={item.invoice_number}
                  total_amount={item.total_amount}
                  description={item.description}
                  transaction_type={item.transaction_type}
                  createdOn={item.createdOn}
                />
              ))
            )}
          </Box>
        </Box>
        <Button mb="$4" bgColor="transparent">
          <ButtonText color="$primaryRed500">Show More</ButtonText>
        </Button>
      </ScrollView>
    </View>
  );
}
