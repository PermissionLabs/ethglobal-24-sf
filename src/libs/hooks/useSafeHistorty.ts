import { useAccount } from 'wagmi';
import { useQuery } from 'wagmi/query';
import { SAFE_SERVICE_API } from '../constants/safe';

export const useSafeHistory = () => {
  const { address } = useAccount();
  const {} = useQuery({
    queryKey: ['safeHistory', address],
    queryFn: async () => {
      if (address) {
        const res = await fetch(SAFE_SERVICE_API.allTransactions(address)).then((res) => res.json());
      }
    },
  });
};
