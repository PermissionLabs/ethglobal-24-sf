import { useCreateCall, useDeployGuard, useGuardManager } from './Guard.hook';
import { useDeployGuardWithAlchemy } from './useDeployGuard';

export const Guard = () => {
  const { mutate } = useDeployGuard();
  const { mutate: createCall, data, isSuccess } = useCreateCall();
  const { mutate: setGuard } = useGuardManager();

  const { mutate: deployGuardWithAA, data: aa } = useDeployGuardWithAlchemy();

  return (
    <div>
      <h3> ************* WARNING ************* </h3>
      <h3>*THIS WILL CREATE ONCHAIN CONTRACT*</h3>
      {isSuccess && <div>{aa?.tx}</div>}
      <button
        type="button"
        onClick={() => {
          deployGuardWithAA();
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
