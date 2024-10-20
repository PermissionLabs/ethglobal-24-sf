import { useState } from 'react';
import { JUNGWOO_TEST_ADDRESS } from '../../libs/constants/safe';
import { useTransfer } from './Send.hook';

export const Send = () => {
  const [amount, setAmount] = useState<number>();

  const { mutate } = useTransfer();

  const handleClick = () => {
    mutate({ amount: amount ?? 0, to: JUNGWOO_TEST_ADDRESS });
  };

  return (
    <div>
      <input
        type={'number'}
        step={'any'}
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <button type="button" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};
