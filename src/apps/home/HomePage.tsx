import { useAccount } from 'wagmi';
import { Connector } from '../connector/Connector';
import { History } from '../history/History';
import { Send } from '../send/Send';
import { Signer } from '../signer/Signer';
import { Guard } from '../guard/Guard';
import { Minter } from '../minter/Minter';

export const HomePage = () => {
  const { address } = useAccount();
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page.</p>
      <Connector />
      <p>connected address is {address}</p>

      <Send />
      <Minter />
      <Signer />
      <Guard />
      <div>
        <History />
      </div>
    </div>
  );
};
