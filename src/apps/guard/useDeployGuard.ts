import { useMutation } from '@tanstack/react-query';
import { useAlchemyAccount } from '../../libs/hooks/useAlchemyAccount';
import { EVM_DEPLOYER_ADDRESS } from '../../libs/constants/evm';
import { SpotGuard } from '../../abi/SpotGuard/abi';

export const useDeployGuardWithAlchemy = () => {
  const { getAlchemyAccountClient } = useAlchemyAccount();

  const deployGuard = async () => {
    console.log('deploy called');

    const client = await getAlchemyAccountClient();
    console.log('smart account client', client);
    const response = await client.sendUserOperation({
      uo: {
        target: EVM_DEPLOYER_ADDRESS,
        data: SpotGuard.byteCode as `0x${string}`,
      },
    });

    console.log('user op res', response);

    const tx = await client.waitForUserOperationTransaction(response);

    console.log('tx', tx);
    return {
      op: response,
      tx,
    };
  };

  return useMutation({
    mutationFn: deployGuard,
  });
};
