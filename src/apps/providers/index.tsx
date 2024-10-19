import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { safeConfig } from './config';
import SafeProvider from '@safe-global/safe-apps-react-sdk';
import { SafeProvider as CustomSafeProvider } from './SafeProvider';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeProvider>
        <WagmiProvider config={safeConfig}>
          <CustomSafeProvider>{children}</CustomSafeProvider>
        </WagmiProvider>
      </SafeProvider>
    </QueryClientProvider>
  );
};
