import { createLightAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { type SmartAccountSigner, WalletClientSigner, baseSepolia } from '@alchemy/aa-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export const useAlchemyAccount = () => {
  const { primaryWallet } = useDynamicContext();
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  const policyId = process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID as string;

  const getAlchemyAccountClient = async () => {
    if (!primaryWallet) {
      throw new Error('No primary wallet found');
    }

    if (!isEthereumWallet(primaryWallet)) {
      throw new Error('This wallet is not a Ethereum wallet');
    }

    const dynamicProvider = await primaryWallet?.getWalletClient();

    // a smart account signer you can use as an owner on ISmartContractAccount
    const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
      dynamicProvider,
      'dynamic', // signer type
    );

    const smartAccountClient = await createLightAccountAlchemyClient({
      signer: dynamicSigner,
      chain: baseSepolia,
      apiKey,
      gasManagerConfig: {
        policyId,
      },
    });

    return smartAccountClient;
  };

  return { getAlchemyAccountClient };
};
