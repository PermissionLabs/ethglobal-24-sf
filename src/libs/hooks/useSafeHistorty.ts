import { useAccount } from 'wagmi';
import { useQuery } from 'wagmi/query';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import type { AllTransactionsListResponse } from '@safe-global/api-kit';
import { useSafe } from '../../apps/providers/SafeProvider';
import { QueryKeys } from '../constants/queryKeys';

export const useSafeHistory = () => {
  const { address } = useAccount();
  const { sdk, safe: safeInfo } = useSafeAppsSDK();
  const { safe } = useSafe();
  return useQuery<
    AllTransactionsListResponse | undefined,
    Error,
    AllTransactionsListResponse,
    [string, string | undefined, number]
  >({
    queryKey: [QueryKeys.safeHistory, address, safeInfo.chainId],
    queryFn: async () => {
      if (address) {
        const safeInfo = await sdk.safe.getInfo();
        const safeHistory = await safe.getTransactions(address);
        return safeHistory;
      }
    },
  });
};
