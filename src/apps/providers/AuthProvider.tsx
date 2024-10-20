import { useSignerStatus } from '@account-kit/react';
import { LoginPage } from '../login/LoginPage';

export const AuthProvider = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;

  const { isAuthenticating: isLoading, isConnected } = useSignerStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isConnected) {
    return <>{children}</>;
  }

  return <LoginPage />;
};
