import { useAutoConnect } from './Connector.hook';

export const Connector = () => {
  useAutoConnect();

  return <div>connect!</div>;
};
