import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { alchemyConfig, safeConfig } from './config';
import SafeProvider from '@safe-global/safe-apps-react-sdk';
import { SafeProvider as CustomSafeProvider } from './SafeProvider';
import type { AlchemyClientState } from '@account-kit/core';
import { AlchemyAccountProvider } from '@account-kit/react';
import { AuthProvider } from './AuthProvider';

const queryClient = new QueryClient();

export const Providers = ({
  children,
  alchemyInitialState,
}: { children: React.ReactNode; alchemyInitialState?: AlchemyClientState }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={alchemyConfig} queryClient={queryClient} initialState={alchemyInitialState}>
        <AuthProvider>
          <SafeProvider>
            <WagmiProvider config={safeConfig}>
              <CustomSafeProvider>{children}</CustomSafeProvider>
            </WagmiProvider>
          </SafeProvider>
        </AuthProvider>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
};
