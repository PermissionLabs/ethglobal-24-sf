import { useQuery } from 'wagmi/query';
import { useAlchemyAccount } from '../../libs/hooks/useAlchemyAccount';

export const Alchemy = () => {
  const { getAlchemyAccountClient } = useAlchemyAccount();

  const { data, isFetching } = useQuery({
    queryKey: ['TEST'],
    queryFn: getAlchemyAccountClient,
  });

  return (
    <div>
      {isFetching ? (
        <p>Loading</p>
      ) : (
        <p>
          wallet: {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
          <span>{(data as any)?.getAddress()}</span>
        </p>
      )}
    </div>
  );
};
