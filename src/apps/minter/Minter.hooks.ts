import { createLightAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { type SmartAccountSigner, WalletClientSigner, baseSepolia } from '@alchemy/aa-core';
import { encodeFunctionData } from 'viem';
import { MOCK_SWORD_NFT } from './mocks';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';

export const useMint = () => {
  const { primaryWallet } = useDynamicContext();

  const handleMint = async () => {
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
      apiKey: '5HuHRVjJLoRW2UmfBUxYLyCWEqSffx3U',
      gasManagerConfig: {
        policyId: '255b8ab7-09dd-4421-a5a3-55bc89a6808c',
      },
    });

    const callData = encodeFunctionData({
      abi: MOCK_SWORD_NFT.ABI,
      functionName: MOCK_SWORD_NFT.FUNCTION_NAME,
      args: MOCK_SWORD_NFT.getArgs(smartAccountClient.getAddress()),
    });

    const response = await smartAccountClient.sendUserOperation({
      uo: {
        target: MOCK_SWORD_NFT.ADDRESS,
        data: callData,
      },
    });

    const tx = await smartAccountClient.waitForUserOperationTransaction(response);

    console.log('response', response, tx);
  };

  return { handleMint };
};
