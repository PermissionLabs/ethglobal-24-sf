import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { privyConfig, safeConfig } from './config';
import SafeProvider from '@safe-global/safe-apps-react-sdk';
import { SafeProvider as CustomSafeProvider } from './SafeProvider';
import { PrivyProvider } from '@privy-io/react-auth';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeProvider>
        <PrivyProvider appId="cm2fim35l05ck11crzwmcdgzu" config={privyConfig}>
          <WagmiProvider config={safeConfig}>
            <CustomSafeProvider>{children}</CustomSafeProvider>
          </WagmiProvider>
        </PrivyProvider>
      </SafeProvider>
    </QueryClientProvider>
  );
};
