import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { useMutation } from '@tanstack/react-query';
import { type Abi, encodeFunctionData, parseAbi } from 'viem';
import { useAccount, useConfig, useDeployContract } from 'wagmi';
import { SAFE_CREATE_CALL_CONTRACTS } from '../../libs/constants/safe';
import { MOCK_SWORD_NFT } from '../minter/mocks';
import { GuardAbi, GuardBytecode } from './guardAbi';
import { createLightAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { type SmartAccountSigner, WalletClientSigner, baseSepolia } from '@alchemy/aa-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { EVM_DEPLOYER_ADDRESS } from '../../libs/constants/evm';
import { SpotGuard } from '../../abi/SpotGuard/abi';

export const useDeployGuard = () => {
  const { safe, sdk } = useSafeAppsSDK();

  const config = useConfig();
  const { address } = useAccount();
  const { deployContract, ...rest } = useDeployContract();

  const deploySafeGuard = async () => {
    console.log('current sdk account', await sdk.safe.getInfo());

    const callData = encodeFunctionData({
      abi: MOCK_SWORD_NFT.ABI,
      functionName: MOCK_SWORD_NFT.FUNCTION_NAME,
      args: MOCK_SWORD_NFT.getArgs(safe.safeAddress),
    });

    const txs = [
      // {
      //   value: '0',
      //   data: GuardBytecode,
      // },
      {
        to: MOCK_SWORD_NFT.ADDRESS,
        data: callData,
        value: '0',
      },
    ];

    const res = await sdk.txs.send({
      txs,
    });

    console.log('result', res);
    const safeTxn = await sdk.txs.getBySafeTxHash(res.safeTxHash);
    console.log('safeTxn', safeTxn);

    return res;
  };

  const deployGuard = () => {
    console.log('wagmi config is', config);
    console.log('deploy!', safe, address);
    deployContract({
      abi: GuardAbi,
      bytecode: GuardBytecode,
      account: safe.safeAddress,
    });
  };

  return useMutation({
    mutationFn: deploySafeGuard,
  });
};

// export const useAlchemyDeployContract = () => {
//   const { client, address } = useSmartAccountClient({
//     type: 'LightAccount',
//   });

//   client;

//   const { sendUserOperation, ...operations } = useSendUserOperation({
//     client,
//   });

//   const deploy = () => {
//     sendUserOperation({
//       uo: {
//         target: '0x0000000000000000000000000000000000000000',
//         value: BigInt(0),
//         data: GuardBytecode,
//       },
//     });
//   };

//   return { deploy, ...operations };
// };

// use this to allow safe to create a contract
export const useCreateCall = () => {
  const { safe, sdk } = useSafeAppsSDK();

  // Define CreateCall contract ABI and address
  const createCallAbi = parseAbi([
    'function performCreate(uint256 value, bytes memory deploymentData) public returns (address newContract)',
  ]);

  const data = encodeFunctionData({
    abi: createCallAbi,
    functionName: 'performCreate',
    args: [BigInt(0), SpotGuard.byteCode as `0x${string}`],
  });

  // Construct the transaction
  const transaction = {
    to: SAFE_CREATE_CALL_CONTRACTS[safe.chainId] as string,
    value: '0',
    data: data,
    operation: 1,
  };

  return useMutation({
    mutationFn: async () => {
      return await sdk.txs.send({ txs: [transaction] });
    },
  });
};

// safe account set guard
export const useGuardManager = () => {
  const { safe, sdk } = useSafeAppsSDK();
  const testOwnerOnlyGuard = '0x2c69491C235b24Ee3f0E0adf1308BcfB2538b8cd';
  const setGuardAbi = [
    {
      inputs: [{ internalType: 'address', name: 'guard', type: 'address' }],
      name: 'setGuard',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ] as const satisfies Abi;

  const data = encodeFunctionData({
    abi: setGuardAbi,
    functionName: 'setGuard',
    args: [testOwnerOnlyGuard],
  });

  const tx = {
    to: safe.safeAddress,
    data: data,
    value: '0',
  };

  const setGuard = async () => {
    return await sdk.txs.send({ txs: [tx] });
  };

  return useMutation({
    mutationFn: setGuard,
  });
};

export const useAlchemyDeployContract = () => {
  const { primaryWallet } = useDynamicContext();

  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  const policyId = process.env.NEXT_PUBLIC_ALCHEMY_POLICY_ID as string;

  const handleDeploy = async () => {
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

    const response = await smartAccountClient.sendUserOperation({
      uo: {
        target: EVM_DEPLOYER_ADDRESS,
        data: GuardBytecode,
      },
    });

    const tx = await smartAccountClient.waitForUserOperationTransaction(response);
    return [response, tx];
  };

  return useMutation({
    mutationFn: handleDeploy,
  });
};
