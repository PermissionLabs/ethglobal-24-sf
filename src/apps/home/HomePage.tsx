import { useAccount } from 'wagmi';
import { Connector } from '../connector/Connector';
import { History } from '../history/History';
import { Send } from '../send/Send';
import { Signer } from '../signer/Signer';
import { Minter } from '../minter/Minter';
import { usePrivy } from '@privy-io/react-auth';

export const HomePage = () => {
  const { address } = useAccount();
  const { login, logout, authenticated } = usePrivy();

  return (
    <div style={{ backgroundColor: '#0f0f0f', width: '100vw', minHeight: '100vh' }}>
      <div>
        <button type="button" onClick={() => login()}>
          LOGIN
        </button>
        <button type="button" onClick={() => logout()}>
          LOGOUT
        </button>
        <p>authenticated: {authenticated ? 'true' : 'false'}</p>
      </div>
      <h1>Home Page</h1>
      <p>This is the home page.</p>
      <Connector />
      <p>connected address is {address}</p>

      <Send />
      <Minter />
      <Signer />
      <div>
        <History />
      </div>
    </div>
  );
};
