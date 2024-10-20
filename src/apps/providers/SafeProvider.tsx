import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Safe } from '../../libs/safe';

type SafeContext = {
  safe: Safe;
};
const SafeContext = createContext<SafeContext | undefined>(undefined);

export const SafeProvider = ({ children }: { children: ReactNode }) => {
  const { safe: safeAppSDKSafe } = useSafeAppsSDK();
  const [safe, setSafe] = useState(new Safe(safeAppSDKSafe.chainId));

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (safeAppSDKSafe.chainId !== safe.chainId) setSafe(new Safe(safeAppSDKSafe.chainId));
  }, [safeAppSDKSafe.chainId]);
  return <SafeContext.Provider value={{ safe }}>{children}</SafeContext.Provider>;
};

export const useSafe = () => {
  const value = useContext(SafeContext);

  if (value === undefined) {
    throw new Error('You probably forgot to put <SafeProvider>.');
  }
  return value;
};
