import { alchemy, baseSepolia } from '@account-kit/infra';
import { cookieStorage, createConfig as createAAConfg } from '@account-kit/react';
import { createConfig as createWagmiConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
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

export const alchemyConfig = createAAConfg(
  {
    // alchemy config
    transport: alchemy({ apiKey: '5HuHRVjJLoRW2UmfBUxYLyCWEqSffx3U' }),
    chain: baseSepolia, // `baseSepolia` 내에 alchemy rpc 안쓰면 뭐라함;;
    ssr: true, // Defers hydration of the account state to the client after the initial mount solving any inconsistencies between server and client state (read more here: https://accountkit.alchemy.com/react/ssr)
    storage: cookieStorage, // persist the account state using cookies (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
    policyId: '255b8ab7-09dd-4421-a5a3-55bc89a6808c',
  },
  {
    // authentication ui config - your customizations here
    auth: {
      sections: [[{ type: 'email' }], [{ type: 'social', authProviderId: 'google', mode: 'popup' }]],
    },
  },
);
