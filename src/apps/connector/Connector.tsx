import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { useAutoConnect } from './Connector.hook';

export const Connector = () => {
  useAutoConnect();
  const { connected } = useSafeAppsSDK();

  return <div>{connected ? 'Connected!' : 'Disconnected!'}</div>;
};
