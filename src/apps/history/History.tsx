import { useSafeHistory } from '../../libs/hooks/useSafeHistorty';

export const History = () => {
  const { data, isFetching } = useSafeHistory();
  return (
    <div>
      {data?.results.map((txn) => (
        <div key={txn.executionDate}>
          <p>{txn.txType}</p>
          <p>{txn.executionDate}</p>
        </div>
      ))}
      {isFetching && <p>Loading...</p>}
    </div>
  );
};
