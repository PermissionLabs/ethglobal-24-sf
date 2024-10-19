import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { useMutation } from '@tanstack/react-query';

export const useSignMessage = () => {
  const { sdk } = useSafeAppsSDK();
  return useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      return await sdk.txs.signMessage(message);
    },
  });
};
