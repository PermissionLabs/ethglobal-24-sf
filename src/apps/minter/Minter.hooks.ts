import { useSendUserOperation, useSmartAccountClient } from '@account-kit/react';
import { encodeFunctionData } from 'viem';
import { MOCK_SWORD_NFT } from './mocks';

export const useMint = () => {
  const { client, address } = useSmartAccountClient({
    type: 'LightAccount',
  });

  const { sendUserOperationAsync, isSendingUserOperation: isSending } = useSendUserOperation({
    client,
  });

  const handleMint = async () => {
    if (!client) {
      return;
    }

    if (!address) {
      return;
    }

    // Using `encodeFunctionData` from `viem`
    const callData = encodeFunctionData({
      abi: MOCK_SWORD_NFT.ABI,
      functionName: MOCK_SWORD_NFT.FUNCTION_NAME,
      args: MOCK_SWORD_NFT.getArgs(address),
    });

    const response = await sendUserOperationAsync({
      uo: {
        target: MOCK_SWORD_NFT.ADDRESS,
        data: callData,
      },
    });

    console.log(response);
    console.log('into', address);
  };

  return {
    isSending,
    handleMint,
  };
};
