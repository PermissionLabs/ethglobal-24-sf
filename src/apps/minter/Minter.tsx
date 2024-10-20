import { useMint } from './Minter.hooks';

export const Minter = () => {
  const { handleMint } = useMint();

  return (
    <div>
      <p>Alchemy Minter</p>
      <button type="button" onClick={handleMint}>
        Mint!
      </button>
    </div>
  );
};
