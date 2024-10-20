import { createLightAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { type SmartAccountSigner, WalletClientSigner, baseSepolia } from '@alchemy/aa-core';
import { useWallets } from '@privy-io/react-auth';
import { createWalletClient, custom, encodeFunctionData } from 'viem';
import { MOCK_SWORD_NFT } from './mocks';

export const useMint = () => {
  const { wallets } = useWallets();

  const handleMint = async () => {
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

    console.log('hi', embeddedWallet, wallets);

    if (!embeddedWallet) {
      return;
    }

    console.log(embeddedWallet);

    const eip1193provider = await embeddedWallet.getEthereumProvider();

    const privyClient = createWalletClient({
      account: embeddedWallet.address,
      chain: baseSepolia,
      transport: custom(eip1193provider),
    });

    // Create an AccountKit SmartAccountSigner from the embedded wallet
    const privySigner: SmartAccountSigner = new WalletClientSigner(privyClient, 'json-rpc');

    const smartAccountClient = await createLightAccountAlchemyClient({
      signer: privySigner,
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

  return {
    isSending: false,
    handleMint,
  };
};
