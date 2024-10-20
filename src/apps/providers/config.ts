import type { PrivyClientConfig } from '@privy-io/react-auth';
import { createConfig as createWagmiConfig, http } from 'wagmi';
import { baseSepolia, mainnet, sepolia } from 'wagmi/chains';
import { safe } from 'wagmi/connectors';

export const safeConfig = createWagmiConfig({
  chains: [mainnet, sepolia],
  connectors: [safe({ allowedDomains: [/app.safe.global$/], debug: false })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export const privyConfig: PrivyClientConfig = {
  /* Replace this with your desired login methods */
  loginMethods: ['email'],
  /* Replace this with your desired appearance configuration */
  appearance: {
    theme: 'light',
    accentColor: '#676FFF',
    // logo: 'your-logo-url',
  },
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
  },
  // Import your desired chain from `viem/chains` and pass it to `defaultChain`
  defaultChain: baseSepolia,
};
