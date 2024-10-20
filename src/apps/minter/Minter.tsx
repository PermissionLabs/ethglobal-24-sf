import { useMint } from './Minter.hooks';

export const Minter = () => {
  const { isSending, handleMint } = useMint();

  return (
    <div>
      <p>Alchemy Minter</p>
      <button type="button" disabled={isSending} onClick={handleMint}>
        Mint!
      </button>
    </div>
  );
};
