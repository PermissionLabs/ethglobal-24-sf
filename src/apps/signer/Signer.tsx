import { useState } from 'react';
import { useSignMessage } from './Signer.hook';

export const Signer = () => {
  const [message, setMessage] = useState('sign this message');
  const { mutate, isPending } = useSignMessage();

  const handleSign = () => {
    mutate({ message });
  };

  return (
    <div>
      <p>{message}</p>
      {isPending ? (
        <p>signing...</p>
      ) : (
        <button type="button" onClick={handleSign}>
          sign message
        </button>
      )}
    </div>
  );
};
