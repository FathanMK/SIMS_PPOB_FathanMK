import {Box, Text} from '@gluestack-ui/themed';
import formatToIDR from '../../../../utils/formatToIDR';

interface ITransactionBox {
  total_amount: number;
  description: string;
  transaction_type: string;
  createdOn: string;
}

export default function TransactionBox({
  total_amount,
  description,
  transaction_type,
  createdOn,
}: ITransactionBox) {
  return (
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
          + {formatToIDR(total_amount)}
        </Text>
        <Text fontSize="$sm" fontWeight="$bold">
          {description}
        </Text>
      </Box>
      <Text mt="$2" fontSize="$xs" color="rgba(0,0,0,0.45)">
        {createdOn}
      </Text>
    </Box>
  );
}
