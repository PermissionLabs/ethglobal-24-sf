import { useSendTransaction } from 'wagmi';

export const useMint = () => {
  const { sendTransaction } = useSendTransaction();
  const mint = async () => {
    sendTransaction({});
  };

  return { mint };
};
