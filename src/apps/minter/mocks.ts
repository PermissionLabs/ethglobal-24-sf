export const MOCK_SWORD_NFT = {
  ID: 2241,
  ADDRESS: '0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49',
  FUNCTION_NAME: 'mintTo',
  ABI: [
    {
      inputs: [
        { internalType: 'address', name: 'recipient', type: 'address' },
        { internalType: 'uint16', name: 'item', type: 'uint16' },
      ],
      name: 'mintTo',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function',
    },
  ],

  getArgs: (mintingAddress: string) => {
    return [mintingAddress, 1];
  },
};
