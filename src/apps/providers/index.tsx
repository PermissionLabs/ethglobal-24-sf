import SafeProvider from '@safe-global/safe-apps-react-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { SafeProvider as CustomSafeProvider } from './SafeProvider';
import { safeConfig } from './config';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

const queryClient = new QueryClient();

const DYNAMIC_ENVIRONMENT_ID = '1a6cce0f-3145-4516-ac1f-6d92eb144b66';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeProvider>
        <DynamicContextProvider
          settings={{
            environmentId: DYNAMIC_ENVIRONMENT_ID,
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <WagmiProvider config={safeConfig}>
            <CustomSafeProvider>{children}</CustomSafeProvider>
          </WagmiProvider>
        </DynamicContextProvider>
      </SafeProvider>
    </QueryClientProvider>
  );
};
