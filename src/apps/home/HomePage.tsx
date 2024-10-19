import { useAccount } from 'wagmi';
import { Connector } from '../connector/Connector';
import { History } from '../history/History';
import { Send } from '../send/Send';
import { Signer } from '../signer/Signer';

export const HomePage = () => {
  const { address } = useAccount();
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page.</p>
      <Connector />
      <p>connected address is {address}</p>

      <Send />
      <Signer />
      <div>
        <History />
      </div>
    </div>
  );
};
