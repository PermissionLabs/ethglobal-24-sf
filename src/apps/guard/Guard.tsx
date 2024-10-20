import { useCreateCall, useDeployGuard, useGuardManager } from './Guard.hook';

export const Guard = () => {
  const { mutate } = useDeployGuard();
  const { mutate: createCall, data, isSuccess } = useCreateCall();
  const { mutate: setGuard } = useGuardManager();

  return (
    <div>
      <h3> ************* WARNING ************* </h3>
      <h3>*THIS WILL CREATE ONCHAIN CONTRACT*</h3>
      {isSuccess && <div>{data.safeTxHash}</div>}
      <button
        type="button"
        onClick={() => {
          createCall();
        }}
      >
        deploy
      </button>
      <button
        type="button"
        onClick={() => {
          setGuard();
        }}
      >
        set guard
      </button>
    </div>
  );
};
