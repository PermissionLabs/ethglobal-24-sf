import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { parseEther } from 'viem';
import { QueryKeys } from '../../libs/constants/queryKeys';

export const useTransfer = () => {
  const { sdk } = useSafeAppsSDK();
  const queryClient = useQueryClient();

  const transferEth = async (amount: number, to: string) => {
    // convert human number to wei
    const paresedAmount = parseEther(amount.toString());
    const txs = [
      {
        to,
        value: paresedAmount.toString(),
        data: '',
      },
    ];
    return await sdk.txs.send({
      txs,
    });
  };

  return useMutation({
    mutationFn: ({ amount, to }: { amount: number; to: string }) => transferEth(amount, to),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.safeHistory],
      });
    },
  });
};
