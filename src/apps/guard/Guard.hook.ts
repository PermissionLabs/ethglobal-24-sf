import { useAccount, useConfig, useDeployContract } from 'wagmi';
import { GuardAbi, GuardBytecode } from './guardAbi';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { useMutation } from '@tanstack/react-query';

export const useDeployGuard = () => {
  const { safe, sdk } = useSafeAppsSDK();

  const config = useConfig();
  const { address } = useAccount();
  const { deployContract, ...rest } = useDeployContract();

  const deploySafeGuard = async () => {
    console.log('current sdk account', await sdk.safe.getInfo());
    const txs = [
      {
        to: '0x0000000000000000000000000000000000000000',
        value: '0',
        data: GuardBytecode,
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
