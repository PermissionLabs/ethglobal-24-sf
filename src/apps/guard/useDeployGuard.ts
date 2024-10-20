import { useMutation } from '@tanstack/react-query';
import { useAlchemyAccount } from '../../libs/hooks/useAlchemyAccount';
import { SpotGuard } from '../../abi/SpotGuard/abi';
import { encodeFunctionData, getContractAddress, parseAbi, toHex } from 'viem';
import { SAFE_CREATE_CALL_CONTRACTS } from '../../libs/constants/safe';

export const useDeployGuardWithAlchemy = () => {
  const { getAlchemyAccountClient } = useAlchemyAccount();

  const deployGuard = async () => {
    // create client by createLightAccountAlchemyClient
    const client = await getAlchemyAccountClient();

    // create call test
    // Define CreateCall contract ABI and address
    const createCallAbi = parseAbi([
      'function performCreate2(uint256 value, bytes memory deploymentData, bytes32 salt) public returns (address newContract)',
    ]);

    const rand = Math.random();
    const salt = toHex(`permit${rand}`, { size: 32 });
    console.log('salt is', rand, salt);

    const data = encodeFunctionData({
      abi: createCallAbi,
      functionName: 'performCreate2',
      args: [BigInt(0), SpotGuard.byteCode as `0x${string}`, salt],
    });

    const response = await client.sendUserOperation({
      uo: {
        target: SAFE_CREATE_CALL_CONTRACTS[client.chain?.id as number] as string,
        data,
      },
    });

    console.log('user op res', response);

    const tx = await client.waitForUserOperationTransaction(response);

    console.log('tx', tx);

    const contractAddress = getContractAddress({
      salt,
      from: '0xd53Eb5203e367BbDD4f72338938224881Fc501Ab',
      bytecode: data,
      opcode: 'CREATE2',
    });

    console.log('salt is', rand, salt);
    console.log('contractAddress', contractAddress);

    // const response = await client.sendUserOperation({
    //   uo: {
    //     target: EVM_DEPLOYER_ADDRESS,
    //     data: SpotGuard.byteCode as `0x${string}`,
    //   },
    // });

    // console.log('user op res', response);

    // const tx = await client.waitForUserOperationTransaction(response);

    // console.log('tx', tx);

    const receipt = await client.getTransactionReceipt({ hash: tx });
    console.log('Contract address:', receipt);

    // Get the full transaction details
    const txs = await client.getTransaction({ hash: tx });
    console.log('getTransaction', txs);

    if (tx) {
      // Calculate the contract address
      const calculatedAddress = getContractAddress({
        from: txs.from,
        nonce: BigInt(txs.nonce),
      });
      console.log('Calculated contract address:', calculatedAddress);

      // Verify if the calculated address has code
      const code = await client.getBytecode({ address: calculatedAddress });
      if (code && code !== '0x') {
        console.log('Verified: Contract exists at the calculated address');
      } else {
        console.log('Warning: No code found at the calculated address');
      }
    } else {
      console.log('Error: Could not retrieve transaction details');
    }

    return {
      op: response,
      tx,
    };
  };

  return useMutation({
    mutationFn: deployGuard,
  });
};
