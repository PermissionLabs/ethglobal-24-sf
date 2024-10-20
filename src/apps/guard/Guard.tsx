import { useDeployGuard } from './Guard.hook';

export const Guard = () => {
  const { mutate } = useDeployGuard();

  return (
    <div>
      <h3> ************* WARNING ************* </h3>
      <h3>*THIS WILL CREATE ONCHAIN CONTRACT*</h3>
      <button
        type="button"
        onClick={() => {
          mutate();
        }}
      >
        deploy
      </button>
    </div>
  );
};
