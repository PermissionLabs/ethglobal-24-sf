import { http, createConfig as createWagmiConfig } from 'wagmi';
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
