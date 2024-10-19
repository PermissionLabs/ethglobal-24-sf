import { useMint } from './Minter.hook';

export const Minter = () => {
  const { mint } = useMint();

  return (
    <button type="button" onClick={mint}>
      mint
    </button>
  );
};
